const data = {
    simpleEx:[
      {
        "Child": "Attacker",
        "Parent": "Get a Shovel"
      },
      {
        "Child": "Get a Shovel",
        "Parent": "Tunnel Under the Moat"
      },
      {
        "Child": "Tunnel Under the Moat",
        "Parent": "Surface in the Courtyard"
      },
      {
        "Child": "Surface in the Courtyard",
        "Parent": "Descend to the Treasure Room"
      },
      {
        "Child": "Tunnel Under the Moat",
        "Parent": "Tunnel to the Treasure Room"
      },
      {
        "Child": "Descend to the Treasure Room",
        "Parent": "Steal Guard's Keys"
      },
      {
        "Child": "Steal Guard's Keys",
        "Parent": "Enter the Treasure Room"
      },
      {
        "Child": "Descend to the Treasure Room",
        "Parent": "Pick the Lock"
      },
      {
        "Child": "Attacker",
        "Parent": "Get a Rope"
      },
      {
        "Child": "Get a Rope",
        "Parent": "Scale the Castle Wall"
      },
      {
        "Child": "Scale the Castle Wall",
        "Parent": "Descend to the Treasure Room"
      },
      {
        "Child": "Tunnel to the Treasure Room",
        "Parent": "Steal the Jewels"
      },
      {
        "Child": "Pick the Lock",
        "Parent": "Enter the Treasure Room"
      },
      {
        "Child": "Enter the Treasure Room",
        "Parent": "Steal the Jewels"
      },
    ],
    twoEndStates:[]
  };
  
  let rankdir = "BT";
  let dataSelect = 'simpleEx';
  
  function formatVizString(data){
    let retString = ""
      const textWrapWidth = 15
      let rootNode = undefined
      data.forEach((d)=>{
  
          //Assign shape to the beginning nodes (attacker)
          if(data.map(d=>d['Parent']).indexOf(d.Child) === -1){
              retString = retString + `"${wrap(d.Child,{width:textWrapWidth})}" [shape=ellipse, fillcolor="white"];`
          }
  
          //Assign coloration for states
          retString = retString + `"${wrap(d['Parent'], {width:textWrapWidth})}" [fillcolor="#D3D3D3", fontcolor="black"];`
          
          //Assign shape and color to the root (end state)
          if(data.map(d=>d.Child).indexOf(d['Parent']) === -1){
              rootNode = d.Child
              retString = retString + `"${wrap(d['Parent'],{width:textWrapWidth})}" [shape=octagon, fontcolor="black", fillcolor="white"];`
          }
      
      retString = retString + `"${wrap(d.Child,{width:textWrapWidth})}" -> "${wrap(d['Parent'],{width:textWrapWidth})}" [fontsize=8.0];`
      })
      return retString
  }
  
  function initEventListeners(){
    //Node list
    Array.from(document.getElementsByTagName('input')).forEach((d)=>{
      d.addEventListener('change', function (evt) {
        rankdir = this.value;
        document.getElementById("graphViz").innerHTML = fetchGraphString();
      });
    })
    
    document.getElementById('dataSelect').addEventListener('change', function(evt){
      dataSelect = this.value;
      document.getElementById("graphViz").innerHTML = fetchGraphString();
    })
  }
  
  function fetchGraphString(){
    //Using the DOT notation
    //https://en.wikipedia.org/wiki/DOT_(graph_description_language)
    return Viz(
        `digraph G {
          graph [bgcolor="#e6e9e8", rankdir=${rankdir}]
          node [width=0.0, height=0.0, fontsize=9.0, shape="rectangle", style="filled", fillcolor="#dadbdb", color="black"]
          ${formatVizString(data[dataSelect])}
        }`,
        {engine:"dot"}
      )
  }
  
  document.addEventListener('DOMContentLoaded', function() {
   
    initEventListeners();
    document.getElementById("graphViz").innerHTML = fetchGraphString();
    
  }, false);
  
  //https://raw.githubusercontent.com/jonschlinkert/word-wrap/master/index.js
  function wrap (str, options) {
    
    function identity(str) {
      return str;
    }
    
    options = options || {};
    if (str == null) {
      return str;
    }
  
    var width = options.width || 50;
    var indent = (typeof options.indent === 'string')
      ? options.indent
      : '  ';
  
    var newline = options.newline || '\n' + indent;
    var escape = typeof options.escape === 'function'
      ? options.escape
      : identity;
  
    var regexString = '.{1,' + width + '}';
    if (options.cut !== true) {
      regexString += '([\\s\u200B]+|$)|[^\\s\u200B]+?([\\s\u200B]+|$)';
    }
  
    var re = new RegExp(regexString, 'g');
    var lines = str.match(re) || [];
    var result = indent + lines.map(function(line) {
      if (line.slice(-1) === '\n') {
        line = line.slice(0, line.length - 1);
      }
      return escape(line);
    }).join(newline);
  
    if (options.trim === true) {
      result = result.replace(/[ \t]*$/gm, '');
    }
    return result;
  };