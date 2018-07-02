## What's a VPC?

A [VPC](https://aws.amazon.com/vpc/) or Virtual Private Cloud is a logically isolated section of your AWS cloud. Each
VPC defines a virtual network within which you run your AWS resources, as well as rules for what can go in and out of
that network. This includes subnets, route tables that tell those subnets how to route inbound and outbound traffic,
security groups, firewalls for the subnet (known as "Network ACLs"), and any other network components such as VPN connections.

## What's a Network ACL?

[Network ACLs](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_ACLs.html) provide an extra layer of network
security, similar to a [security group](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-network-security.html).
Whereas a security group controls what inbound and outbound traffic is allowed for a specific resource (e.g. a single
EC2 instance), a network ACL controls what inbound and outbound traffic is allowed for an entire subnet.

## VPC Architecture

The three-tier VPC is inspired by the VPC Architecture described by Ben Whaley in his blog post [A Reference
VPC Architecture](https://www.whaletech.co/2014/10/02/reference-vpc-architecture.html). That blog post proposed the
following VPC structure:

### Three Subnet Tiers

This VPC defines three "tiers" of subnets:

- **Public Subnets**: Resources in these subnets are directly addressable from the Internet. Only public-facing
  resources (typically just load balancers and static content) should be put here.
- **Private Subnets**: Resources in these subnets are NOT directly addressable from the Internet but they can make
  outbound connections to the Internet through a NAT Gateway. You can connect to the resources in this subnet only from
  resources within the VPC, so you should put your app servers here and allow the load balancers in the Public Subnet
  to route traffic to them.
- **Persistence Subnets**: Resources in these subnets are neither directly addressable from the Internet nor
  able to make outbound Internet connections. You can connect to the resources in this subnet only from within the VPC,
  so you should put your databases, cache servers, and other stateful resources here and allow your apps to talk to
  them.
  
### SSH Access via the Bastion Host

To SSH into any of your EC2 Instances in a private subnet, we recommend launching a single "Bastion Host" to use as an SSH jump host. 

- The mgmt VPC uses VPC Peering so that, once in the mgmt VPC, you can access any other environment, but
  once in any other environment, you can only access the mgmt VPC (e.g. you cannot access prod from stage).
- We put "environment-agnostic" or management-level resources in the mgmt VPC such as Jenkins, a metrics store, an LDAP
  server, etc.

## Benefits of a VPC

VPCs are fundamentally about isolating your resources so that they're only reachable by a limited set of other resources
you define. You can set granular isolation rules by defining Route Tables for each Subnet. You ca allow a limited set
of outsiders to connect to your VPC, for example, using VPN, or just by exposing a single host accessible to the public.

The general point is that you have an isolated environment you can use to lock down access.

Given all the above, an intuitive way to leverage a VPC is to make each VPC represent a unique environment by having,
for example, a prod VPC and stage VPC.

### CIDR-Formatted IP Address Ranges

Because a VPC is an isolated world meant specially for your use, you can define a range of private IP addresses that the VPC
will allow. For example, we may wish to allow any IP address from 10.0.50.0 to 10.0.50.15.

But we need a more concise way to represent such an IP address range, and the de facto standard is the Classless Inter-
Domain Routing (CIDR) standard. The name is confusing but as [Wikipedia](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) explains, the concept works as follows:

1. Convert a base-10 IP like `10.0.50.0` to binary format: `00001010.00000000.00110010.00000000`

2. Decide how many binary digits (or bits) we will allow to "vary." For example, suppose I want the following range of IP
   addresses: `00001010.00000000.00110010.00000000` to `00001010.00000000.00110010.11111111` (`10.0.50.0` to `10.0.50.255`).
   Notice that the first three "octets" (group of 8 bits) are the same, but the last octet ranges from 0 to 255.

3. Express the number of varying bits in CIDR format: `<base-10-ip>/<leading-number-of-bits-which-are-fixed>`. For
   example, if we use the range in the previous step, we'd have `10.0.50.0/24`. The first 24 bits are fixed so that the
   remaining 8 bits can vary. In CIDR parlance, our "IP Address" is `10.0.50.0` and our "Network Mask" is `24`.

Sometimes CIDR Ranges are called CIDR Blocks. The CIDR Block `0.0.0.0/0` corresponds to any IP address. The CIDR Block
`1.2.3.4/32` corresponds to only `1.2.3.4`.

You'll notice that every VPC has a CIDR Block, and indeed this represents the range of private IP addresses
which can be assigned to resources in the VPC.

### Subnets

Subnets are "sub-networks", or a partition of the VPC. For example, a VPC might have the CIDR range `10.0.15.0/24`
(`10.0.15.0` - `10.0.15.255`) and a subnet might allow just IP addresses in the range `10.0.15.0/28` (`10.0.15.0` -
`10.0.15.16`). Note that subnets cannot have overlapping CIDR Ranges.

In addition, each subnet can have a unique Route Table.

### Route Tables

Each subnet needs a [Route Table](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Route_Tables.html) so that
it knows how to route traffic within that subnet. For example, a given subnet might route traffic destined for CIDR Block
`10.0.20.0/24` to a VPC Peering Connection, traffic for `10.0.10.0/24` within the VPC, and all the rest (`0.0.0.0/0`) to
to the Internet Gateway so it can reach the public Internet. The Route Table declares all this.

### The Internet Gateway

The best way to think of an [Internet Gateway](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Internet_Gateway.html)
is that it's the destination that VPC traffic destined for the public Internet gets routed to. This configuration is
recorded in a Route Table.

### NAT Gateways

If you launch an EC2 Instance in one of the **Public Subnets** defined above, it will automatically be addressable from
the public Internet and have outbound Internet access itself.

But if you launch an EC2 Instance in one of the **Private Subnets** defined above, it will NOT be addressable from the
public Internet. This is a useful security property. For example, we generally don't want our databases directly addressable
on the public Internet.

But what if an EC2 Instance in a private subnet needs *outbound* Internet access? It could route its requests to the
Internet, but there's no way for the Internet to return the response since, as we just explained, the EC2 Instance isn't
addressable from the Internet.

To solve this problem, we need our private EC2 Instance to submit its public Internet requests through another EC2 Instance
that's located in a public subnet. That EC2 Instance should keep track of where it got its original request so that it
can redirect or "translate" the response it receives back to the original requestor.

Such an EC2 Instance is called a "Network Address Translation" instance, or NAT instance.

But what if the NAT Instance goes down? Now our private EC2 Instance can't reach the Internet at all. That's why it's
preferable to have a highly available NAT Instance service, and that's what Amazon's [NAT Gateway](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/vpc-nat-gateway.html)
service is. Amazon runs more than one EC2 Instance behind the scenes, and automatically handles failover if one instance dies.
