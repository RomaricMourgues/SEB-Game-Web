
var unit = 50;
var scaleFactor = 4;
var clientWidth = document.body.clientWidth;
var clientHeight = document.body.clientHeight;

var circuitColors = [
  {off: "#333", on: "#0AF", shape: 0},
  {off: "#333", on: "#F40", shape: 0},
  {off: "#333", on: "#0F7", shape: 0},
  {off: "#333", on: "#F07", shape: 0},
  {off: "#333", on: "#FA0", shape: 0},
  {off: "#333", on: "#FFF", shape: 0},
  {off: "#333", on: "#000", shape: 0},
  {off: "#333", on: "#0AF", shape: 4},
  {off: "#333", on: "#F40", shape: 4},
  {off: "#333", on: "#0F7", shape: 4},
  {off: "#333", on: "#F07", shape: 4},
  {off: "#333", on: "#FA0", shape: 4},
  {off: "#333", on: "#FFF", shape: 4},
  {off: "#333", on: "#000", shape: 4},
]

var circuitState = {};
var circuitStateCallbacks = [];

function onCircuitChange(callback){
  circuitStateCallbacks.push(callback);
}
function circuitChange(){
  circuitStateCallbacks.forEach((c)=>{
    if(c) c();
  });
}

var player = undefined;
var blocsByPosition = {};
var blocsList = [];
var offset_x = 0;
var offset_y = 0;
var width_x = 0;
var width_y = 0;
var tick = 0;
var machineguns = [];
var gameTimeouts = [];
var gameIntervals = [];
var voiceTimeouts = [];
var player_is_dead = false;
var max_x = 0, max_y = 0, min_x = Infinity, min_y = Infinity;

var max_level = -1;

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Mouse = Matter.Mouse;
    MouseConstraint = Matter.MouseConstraint;
    Body = Matter.Body;
    Events = Matter.Events;
var engine = null;
var render = null;
var runner = null;

function hasBlock(x, y){
  if(blocsByPosition[y] && blocsByPosition[y][x]){
    return blocsByPosition[y][x];
  }
  return false;
}

function addBloc(world, x, y, item){

  var scale = 1;
  var box = null;
  var options = {
    isStatic: true,
    render: {
      fillStyle: '#444444',
      strokeStyle:'#444444',
      lineWidth: 0.00001
    }
  };

  var positionX = clientWidth*scaleFactor/2 + (offset_x+x-width_x/2)*unit + unit/2;
  var positionY = clientHeight*scaleFactor/2 + (offset_y+y-width_y/2)*unit + unit;

  if(item.type == "B"){
    box = Bodies.rectangle(positionX, positionY+1000-unit/2, unit*scale, 2000, options);
    box.render_static = true;
  }

  if(item.type == "T"){
    box = Bodies.rectangle(positionX, positionY-1000+unit/2, unit*scale, 2000, options);
    box.render_static = true;
  }

  if(item.type == "x" || item.type == "X"){

    var top = hasBlock(x, y-1);
    var left = hasBlock(x-1, y);
    var right = hasBlock(x+1, y);
    var bottom = hasBlock(x, y+1);
    if(item.tl){//}!top && !left){
      box = Bodies.fromVertices(positionX + unit*0.17, positionY + unit*0.17, [{x:positionX-unit/2, y:positionY+unit/2}, {x:positionX+unit/2, y:positionY+unit/2}, {x:positionX+unit/2, y:positionY-unit/2}], options);
    }else if(item.tr){//}!top && !right){
      box = Bodies.fromVertices(positionX - unit*0.17, positionY + unit*0.17, [{x:positionX-unit/2, y:positionY+unit/2}, {x:positionX+unit/2, y:positionY+unit/2}, {x:positionX-unit/2, y:positionY-unit/2}], options);
    }else if(item.bl){//}!bottom && !left){
      box = Bodies.fromVertices(positionX + unit*0.17, positionY - unit*0.17, [{x:positionX-unit/2, y:positionY-unit/2}, {x:positionX+unit/2, y:positionY+unit/2}, {x:positionX+unit/2, y:positionY-unit/2}], options);
    }else if(item.br){//}!bottom && !right){
      box = Bodies.fromVertices(positionX - unit*0.17, positionY - unit*0.17, [{x:positionX-unit/2, y:positionY-unit/2}, {x:positionX-unit/2, y:positionY+unit/2}, {x:positionX+unit/2, y:positionY-unit/2}], options);
    }else{
      box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    }

    box.render_static = true;

    item.onCollideActive = (body)=>{
      if(body.is_bullet){
        body.not_collided = false;
        body.render.fillStyle = "#000000";
        Body.setVelocity(body, {x: 0, y: 0});
        World.remove(world, body);
      }
    }
  }

  if(item.type == "w_back"){
    options.render.fillStyle = "#FFFFFF";
    options.isSensor = true;
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box.render_static = true;
  }

  if(item.type == "w"){
    options.render.fillStyle = "#0000FF88";
    options.isSensor = true;
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box.toReRender = unit*1.1;
    box.toReRenderPulse = 0;
    box.render_static_foreground = true;

    item.onCollideActive = (body, pair)=>{
      if(body.is_bullet){
        body.not_collided = false;
        Body.setVelocity(body, {x: 0, y: 0});
        body.opacity = Math.min(body.opacity, 1-1*pair.separation/unit);
        body.render.fillStyle = "rgba(0,0,0,"+body.opacity+")";
      }

      if(!body.didApplyWater || body.didApplyWater < tick || body.frictionAir == 0.01){
        body.didApplyWater = tick;
        body.frictionAir = 0.1;
        body.frictionStatic = 50;
      }
    }

    item.onCollideEnd = (body)=>{
      if(!body.didApplyWater || body.didApplyWater < tick){
        body.frictionAir = 0.01;
        body.frictionStatic = 5;
      }
    }

  }

  if(item.type == "l"){

    options.render.fillStyle = "#EE7700EE";
    options.isSensor = true;
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box.toReRender = unit*1.1;
    box.toReRenderPulse = 0;
    box.render_static_foreground = true;

    item.onCollideEnd = (body)=>{
      if(body.game_item && body.game_item.type=="p" && !player_is_dead){
        body.render.fillStyle = "#000000";
      }else{
        box.render.fillStyle = "#FF8800";
        body.render.fillStyle = "#FF0000";
      }
      body.frictionAir = 0.01;
      body.frictionStatic = 5;
    }

    item.onCollideActive = (body, pair)=>{

      if(body.is_bullet){
        body.not_collided = false;
        body.render.fillStyle = "#000000";
        Body.setVelocity(body, {x: 0, y: 0});
      }

      if(pair.separation>unit/10){
        if(body == player){
          die("lava");
        }

        body.frictionAir = Math.max(body.frictionAir, 1*pair.separation/unit) + (pair.separation<unit/3?0:0.0005);
        body.frictionStatic = 500;
        body.render.fillStyle = "rgba("+255*(1-Math.max(body.frictionAir, 1*pair.separation/unit))+",0,0,"+ (1-Math.max(body.frictionAir, 1*pair.separation/unit))+")";
        if((1-Math.max(body.frictionAir, 1*pair.separation/unit))<0.1){
          World.remove(world, body);
        }
      }
    }

  }

  if(item.type == "j" || item.type == "bouncer"){
    options.render.fillStyle = "#7C4";
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box.render_static = true;

    box.onCollide = (body)=>{
      var vX = box.position.x - body.position.x;
      var vY = box.position.y - body.position.y;

      if(Math.abs(body.velocity.x)>Math.abs(body.velocity.y)){
        vY = body.velocity.y;
        vX = -10*vX/(vX+vY)*Math.max(0, (item.power?item.power:1))/(50/unit);
      }else if(Math.abs(body.velocity.x)<Math.abs(body.velocity.y)){
        vX = body.velocity.x;
        vY = -10*vY/(vX+vY)*Math.max(0, (item.power?item.power:1))/(50/unit);
      }

      Body.setVelocity(body, {x: vX, y: vY});
    }

  }

  if(item.type == "door"){

    options.render.fillStyle = '#222222';
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;

    box = [box1];

    if(!item.disableIndicator){
      options.isSensor = true;
      var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
      indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
      indicator.render.lineWidth = 1;

      box.push(indicator);
    }

    item.onCollide = (body, pair)=>{
      pair.isActive = !item.open;
    }

    item.onCollideActive = (body, pair)=>{
      pair.isActive = !item.open;

      if(body.is_bullet && !item.open){
        body.not_collided = false;
        body.render.fillStyle = "#000000";
        Body.setVelocity(body, {x: 0, y: 0});
        World.remove(world, body);
      }
    }

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        if(!item.disableIndicator){
          indicator.render.fillStyle = "#00000000";
          indicator.render.strokeStyle = "#00000000";
        }
        if(!item.open){
          sound_on();
        }
        item.open = true;
        box1.render.fillStyle = "#CCCCCC";
      }else{
        if(!item.disableIndicator){
          indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
          indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
        }
        item.open = false;
        box1.render.fillStyle = "#222222";
      }
      box1.noCollision = item.open;
    });

  }

  if(item.type == "freejump"){
    options.isSensor = true;
    var box1 = Bodies.circle(positionX, positionY, unit*scale*0.9/2, options);
    box1.render.fillStyle = "#DDDDDD";
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;

    var direction = Bodies.polygon(positionX, positionY, 3, unit/8, options);
    direction.render.fillStyle = "#00000000";
    direction.render.strokeStyle = "#FFFFFF";
    direction.render.lineWidth = 1;
    Body.rotate(direction, Math.PI/2);

    box1.onCollide = (body)=>{
      box1.toReRenderPulse = 1;
      if(body.game_item && body.game_item.type == "p"){
        box1.render.fillStyle = "#EEEEEE";
      }
    }

    box1.onCollideActive = (body)=>{
      if(body.game_item && body.game_item.type == "p"){
        box1.render.fillStyle = "#EEEEEE";
      }
    }

    box1.onCollideEnd = ()=>{
      box1.toReRenderPulse = 1;
      box1.render.fillStyle = "#DDDDDD";
    }

    box = [box1, direction];
  }

  if(item.type == "antigravity"){
    options.isSensor = true;
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale*0.9, unit*scale*0.9, options);
    box1.render.fillStyle = "#DDDDDD";
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var direction = Bodies.polygon(positionX, positionY, 3, unit/6, options);
    direction.render.fillStyle = "#00000000";
    direction.render.strokeStyle = "#AAAAAA";
    direction.render.lineWidth = 1;

    var direction2 = null;

    if(item.direction == 1){
      Body.rotate(direction, Math.PI);
    }else if(item.direction == 2){
      Body.rotate(direction, Math.PI/2);
    }else if(item.direction == 3){
      Body.rotate(direction, 0);
    }else if(item.direction == 0){
      Body.rotate(direction, -Math.PI/2);
    }else if(item.direction < 0){
      direction = Bodies.circle(positionX, positionY, unit/8, options);
      direction.render.fillStyle = "#00000000";
      direction.render.strokeStyle = "#AAAAAA";
      direction.render.lineWidth = 1;
    }

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        item.on = true;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
      }else{
        item.on = false;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      }
    });
    item.onCollideEnd = (body)=>{
      body.frictionAir = 0.01;
    }

    item.onCollideActive = (body)=>{
      if(item.on){
        body.frictionAir = 0;
        gameTimeouts.push(setTimeout(()=>{
          if(!body.didApplyGravity || body.didApplyGravity < tick){
            body.didApplyGravity = tick;
            //Disable gravity
            if(item.direction != 0){
              Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -world.gravity.scale*body.mass})
            }

            if(item.direction == 1){
              Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: world.gravity.scale*body.mass, y: 0})
            }
            if(item.direction == 3){
              Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: -world.gravity.scale*body.mass, y: 0})
            }
            if(item.direction == 2){
              Body.applyForce(body, {x: body.position.x, y: body.position.y}, {x: 0, y: -world.gravity.scale*body.mass})
            }
          }
        }, 100));
      }else{
        body.frictionAir = 0.01;
      }
    }

    box = [box1, direction, indicator];

  }

  if(item.type == "and"){
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    var circle = Bodies.circle(positionX, positionY, unit/4, options);
    circle.render.fillStyle = "#333";
    circle.render.strokeStyle = "#FFFFFF33";
    circle.render.lineWidth = 1;

    box = [box1, circle, indicator];

    var andIndicators = {};
    var i = 0;
    item.andCircuits.forEach((and)=>{
      var offsetX = unit*Math.cos(i*Math.PI*2/item.andCircuits.length)/4;
      var offsetY = unit*Math.sin(i*Math.PI*2/item.andCircuits.length)/4;
      andIndicators[and] = Bodies.polygon(positionX+offsetX, positionY+offsetY, circuitColors[and || 0].shape, unit*scale/12, options);
      andIndicators[and].render.fillStyle = circuitColors[and || 0].off;
      andIndicators[and].render.strokeStyle = circuitColors[and || 0].on;
      andIndicators[and].render.lineWidth = 1;
      i++;

      box.push(andIndicators[and]);
    });

    circuitState[item.circuit || 0] = 0;

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;

      var allOn = true;
      item.andCircuits.forEach((and)=>{
        if(circuitState[and || 0]>0){
          andIndicators[and].render.fillStyle = circuitColors[and || 0].on;
        }else{
          allOn = false;
          andIndicators[and].render.fillStyle = circuitColors[and || 0].off;
        }
      });

      if(!item.on && allOn){
        item.on = true;
        circuitState[item.circuit || 0] += 1;
        circuitChange();
      }else if(item.on && !allOn){
        item.on = false;
        circuitState[item.circuit || 0] += -1;
        circuitChange();
      }

      if(circuitState[item.circuit || 0]>0){
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
      }else{
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      }
    });

  }

  if(item.type == "transistor"){
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var line2 = Bodies.rectangle(positionX, positionY-unit/5, 0.0001, unit/2, options);
    line2.render.fillStyle = "#00000000";
    line2.render.strokeStyle = circuitColors[item.outB || 0].on;
    line2.render.lineWidth = 1;
    Body.rotate(line2, Math.PI/2);

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    if(item.outA !== null){
      var line = Bodies.rectangle(positionX, positionY, 0.0001, unit/2, options);
      line.render.fillStyle = "#00000000";
      line.render.strokeStyle = circuitColors[item.outA || 0].on;
      line.render.lineWidth = 1;
      Body.rotate(line, -Math.PI/4);

      var indicator2 = Bodies.polygon(positionX+unit/5, positionY+unit/5, circuitColors[item.outA || 0].shape, unit*scale/12, options);
      indicator2.render.fillStyle = circuitColors[item.outA || 0].off;
      indicator2.render.strokeStyle = circuitColors[item.outA || 0].on;
      indicator2.render.lineWidth = 1;
    }

    var indicator3 = Bodies.polygon(positionX+unit/5, positionY-unit/5, circuitColors[item.outB || 0].shape, unit*scale/12, options);
    indicator3.render.fillStyle = circuitColors[item.outB || 0].off;
    indicator3.render.strokeStyle = circuitColors[item.outB || 0].on;
    indicator3.render.lineWidth = 1;

    var indicator4 = Bodies.polygon(positionX-unit/5, positionY-unit/5, circuitColors[item.input || 0].shape, unit*scale/12, options);
    indicator4.render.fillStyle = circuitColors[item.input || 0].off;
    indicator4.render.strokeStyle = circuitColors[item.input || 0].on;
    indicator4.render.lineWidth = 1;

    box = [box1, line2, indicator3];

    if(item.outA){
      box.push(line);
      box.push(indicator2);
    }

    box.push(indicator4);
    box.push(indicator);

    circuitState[item.circuit || 0] = 0;
    line.render.strokeStyle = "#00000000";

    onCircuitChange(()=>{

      box1.toReRenderPulse = 1;
      if(circuitState[item.input || 0]>0){
        indicator4.render.fillStyle = circuitColors[item.input || 0].on;
      }else{
        indicator4.render.fillStyle = circuitColors[item.input || 0].off;
      }

      var changed = false;
      if(item.on && circuitState[item.circuit || 0]<=0){
        item.on = false;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;

        //Deactivate outA, activate outB
        if(item.outA !== null){
          line.render.strokeStyle = "#00000000";
        }
        line2.render.strokeStyle = circuitColors[item.outB || 0].on;

        changed = true;
      }else if(!item.on && circuitState[item.circuit || 0]>0){
        item.on = true;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;

        //Deactivate outB, activate outA
        if(item.outA !== null){
          line.render.strokeStyle = circuitColors[item.outA || 0].on;
        }
        line2.render.strokeStyle = "#00000000";

        changed = true;
      }

      if(item.oldInputState != circuitState[item.input || 0] || changed){
        item.oldInputState = circuitState[item.input || 0];
        if(!item.on){
          circuitState[item.outB || 0] = circuitState[item.input || 0];
          if(item.outA !== null){
            circuitState[item.outA || 0] = 0;
          }
        }else{
          if(item.outA !== null){
            circuitState[item.outA || 0] = circuitState[item.input || 0];
          }
          circuitState[item.outB || 0] = 0;
        }
        circuitChange();
      }

      if(item.outA !== null){
        if(circuitState[item.outA || 0]>0){
          indicator2.render.fillStyle = circuitColors[item.outA || 0].on;
        }else{
          indicator2.render.fillStyle = circuitColors[item.outA || 0].off;
        }
      }

      if(circuitState[item.outB || 0]>0){
        indicator3.render.fillStyle = circuitColors[item.outB || 0].on;
      }else{
        indicator3.render.fillStyle = circuitColors[item.outB || 0].off;
      }

    });

  }

  if(item.type == "generator"){
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    options.isSensor = true;
    options.render.fillStyle = circuitColors[item.circuit || 0].off;
    var timeIndicator = [];
    timeIndicator.push(Bodies.circle(positionX, positionY-unit/4, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX+unit/4, positionY, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX, positionY+unit/4, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX-unit/4, positionY, unit*scale/24, options));

    circuitState[item.circuit || 0] = 0;

    box = [box1, indicator];
    box = box.concat(timeIndicator);

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
      }else{
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      }
    });

    if(!item.repeat){
      setTimeout(()=>{
        circuitState[item.circuit || 0] = 1;
        circuitChange();
      }, 100);

      for(var i=0; i<4; i++){
        timeIndicator[i].render.fillStyle = circuitColors[item.circuit || 0].on;
      }

    }else{

      item.clockPosition = 0;

      gameIntervals.push(setInterval(()=>{
        box1.toReRenderPulse = 1;
        item.clockPosition = (item.clockPosition+1)%8;
        if(!item.on && item.clockPosition%4==0){
          item.on = true;
          circuitState[item.circuit || 0]++;
          circuitChange();
        }else if(item.on && item.clockPosition%4==0){
          item.on = false;
          circuitState[item.circuit || 0]+=-1;
          circuitChange();
        }

        for(var i=0; i<4; i++){
          if(i<item.clockPosition && i+4>=item.clockPosition){
            timeIndicator[i].render.fillStyle = circuitColors[item.circuit || 0].on;
          }else{
            timeIndicator[i].render.fillStyle = circuitColors[item.circuit || 0].off;
          }
        }

      }, Math.max(500, item.repeat)/4));

    }

  }

  if(item.type == "indicator"){
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
      }else{
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      }
    });

    box = [box1, indicator];
  }

  if(item.type == "giver"){

    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.1;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    options.isSensor = true;

    options.render.fillStyle = "#000";
    var form = Bodies.trapezoid(positionX, positionY+unit/8, unit*scale*0.8, unit*scale*0.75, 0.2, options);
    form.render_static = true;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    var indicator2 = Bodies.rectangle(positionX, positionY-unit/3, unit*scale*0.65, unit*scale/8, options);
    indicator2.render.fillStyle = circuitColors[item.circuit || 0].off;

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(item.max == 0){
        return;
      }

      var wasOn = item.on;
      if(circuitState[item.circuit || 0]>0){
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
        indicator2.render.fillStyle = circuitColors[item.circuit || 0].on;
        item.on = true;
      }else{
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
        indicator2.render.fillStyle = circuitColors[item.circuit || 0].off;
        item.on = false;
      }
      if(item.on && !wasOn && item.max>0){
        item.max += -1;
        if(item.max == 0){
          indicator.render.strokeStyle = "#00000000";
          indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
          indicator2.render.fillStyle = circuitColors[item.circuit || 0].off;
        }
        addBloc(world, x, y, {type: item.give, from: item});
      }

      box1.onCollide = (body, pair)=>{
        if(body.game_item && body.game_item.from && body.game_item.from.type == item.type){
          pair.isActive = false;
        }
      };

    });

    box = [box1, form, indicator, indicator2];

  }

  if(item.type == "transporter"){

    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.3;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var offsetY = 0, offsetX = 0, sizeY = 0, sizeX = 0, axis = "x";
    if(item.direction == 2){
      offsetY = +unit/2+unit*0.1/2;
      offsetX = 0;
      sizeY = 0.1;
      sizeX = 1;
    }else if(item.direction == 1){
      offsetY = 0;
      offsetX = -unit/2-unit*0.1/2;
      sizeY = 1;
      sizeX = 0.1;
      axis = "y";
    }else if(item.direction == 3){
      offsetY = 0;
      offsetX = +unit/2+unit*0.1/2;
      sizeY = 1;
      sizeX = 0.1;
      axis = "y";
    }else{
      offsetY = -unit/2-unit*0.1/2;
      offsetX = 0;
      sizeY = 0.1;
      sizeX = 1;
    }

    var transporter = Bodies.rectangle(positionX+offsetX, positionY+offsetY, unit*sizeX, unit*sizeY, options);
    transporter.render.fillStyle = circuitColors[item.circuit || 0].off;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    onCircuitChange(()=>{
      box1.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
        transporter.friction = 0;
      }else{
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
        transporter.friction = 0.1;
      }
      item.on = circuitState[item.circuit || 0]>0;
    });

    transporter.onCollideActive = (body)=>{
      if(item.on){
        Body.setVelocity(body, {x: (axis=="y"?0:(1*(item.inversed?-1:1)))*(item.speed || 1), y: (axis=="x"?0:(1*(item.inversed?-1:1)))*(item.speed || 1)});
      }
    };

    var triangle = Bodies.polygon(positionX+offsetX/2, positionY+offsetY/2, 3, unit/12, options);
    triangle.render.fillStyle = "#00000000";
    triangle.render.strokeStyle = "#AAAAAA";
    triangle.render.lineWidth = 1;

    if(!item.inversed){
      Body.rotate(triangle, Math.PI);
    }

    if(!item.direction%2==0){
      Body.rotate(triangle, Math.PI/2);
    }

    box = [box1, indicator, transporter, triangle];

  }

  if(item.type == "button"){
    var box1 = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box1.toReRender = unit*1.3;
    box1.toReRenderPulse = 0;
    box1.render_static = true;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    options.isSensor = true;
    options.render.fillStyle = circuitColors[item.circuit || 0].off;
    var timeIndicator = [];
    timeIndicator.push(Bodies.circle(positionX-unit/4, positionY-unit/4, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX-unit/12, positionY-unit/4, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX+unit/12, positionY-unit/4, unit*scale/24, options));
    timeIndicator.push(Bodies.circle(positionX+unit/4, positionY-unit/4, unit*scale/24, options));

    options.isSensor = false;

    var offsetY = 0, offsetX = 0, sizeY = 0, sizeX = 0, axis = "x";
    if(item.direction == 2){
      offsetY = +unit/2+unit*0.1/2;
      offsetX = 0;
      sizeY = 0.1;
      sizeX = 0.9;
    }else if(item.direction == 1){
      offsetY = 0;
      offsetX = -unit/2-unit*0.1/2;
      sizeY = 0.9;
      sizeX = 0.1;
      axis = "y";
    }else if(item.direction == 3){
      offsetY = 0;
      offsetX = +unit/2+unit*0.1/2;
      sizeY = 0.9;
      sizeX = 0.1;
      axis = "y";
    }else{
      offsetY = -unit/2-unit*0.1/2;
      offsetX = 0;
      sizeY = 0.1;
      sizeX = 0.9;
    }

    var button = Bodies.rectangle(positionX+offsetX, positionY+offsetY, unit*sizeX, unit*sizeY, options);
    button.render.fillStyle = circuitColors[item.circuit || 0].off;

    circuitState[item.circuit || 0] = 0;

    button.onCollideEnd = (body)=>{
      box1.toReRenderPulse = 1;

      if(body.is_bullet){
        return;
      }

      if(item.pressTimeout) clearTimeout(item.pressTimeout);
      item.pressTimeout = setTimeout(()=>{
        box1.toReRenderPulse = 1;
        item.current_timeout = "end";
        if(item.timeIndicatorsInterval){
          clearInterval(item.timeIndicatorsInterval);
        }
        item.timeIndicatorsInterval = setInterval(()=>{
          box1.toReRenderPulse = 1;
          for(var i=3; i>=item.timeIndicatorsIntervalPosition; i+=-1){
            timeIndicator[i].render.fillStyle = circuitColors[item.circuit || 0].off;
          }
          item.timeIndicatorsIntervalPosition+=-1;
          if(item.timeIndicatorsIntervalPosition<0){
            clearInterval(item.timeIndicatorsInterval);
            if(item.on){
              circuitState[item.circuit || 0] += -1;
              item.on = false;
              indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
              button.render.fillStyle = circuitColors[item.circuit || 0].off;

              timeIndicator.forEach((i)=>{
                i.render.fillStyle = circuitColors[item.circuit || 0].off;
              });

              circuitChange();
            }
          }
          item.timeIndicatorsIntervalPosition = Math.max(0, item.timeIndicatorsIntervalPosition);
        }, Math.max(item.timeout, 100)/4);
        gameIntervals.push(item.timeIndicatorsInterval);
        gameTimeouts.push(item.pressTimeout);

        if(item.collideMinTimeTimout) clearTimeout(item.collideMinTimeTimout);
        gameTimeouts.push(item.collideSensorTimout);


        if(item.pressed){
          Body.setPosition(button, {x: positionX+offsetX, y: positionY+offsetY});
          Body.scale(button, (axis=="y")?2:1, (axis=="x")?2:1);
          item.pressed = false;
        }
      }, 100);
      gameTimeouts.push(item.pressTimeout);

    };

    item.collided = (justCollided)=>{
      box1.toReRenderPulse = 1;
      if(item.pressTimeout) clearTimeout(item.pressTimeout);

      if(!item.timeIndicatorsIntervalPosition){
        item.timeIndicatorsIntervalPosition = 0;
      }

      if(item.timeIndicatorsIntervalPosition<3){
        if(justCollided || item.current_timeout=="end"){
          if(item.timeIndicatorsInterval){
            clearInterval(item.timeIndicatorsInterval);
          }
          item.current_timeout = undefined;
          item.timeIndicatorsInterval = setInterval(()=>{
            box1.toReRenderPulse = 1;
            for(var i=0; i<=item.timeIndicatorsIntervalPosition; i++){
              timeIndicator[i].render.fillStyle = circuitColors[item.circuit || 0].on;
            }
            item.timeIndicatorsIntervalPosition++;
            if(item.timeIndicatorsIntervalPosition>=4){
              clearInterval(item.timeIndicatorsInterval);
              item.timeIndicatorsInterval == null;

              if(!item.on){
                circuitState[item.circuit || 0] += 1;
                item.on = true;
              }

              indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
              button.render.fillStyle = circuitColors[item.circuit || 0].on;

              circuitChange();

            }
            item.timeIndicatorsIntervalPosition = Math.min(3, item.timeIndicatorsIntervalPosition);
          }, Math.max(item.minTime, 100)/4);
          gameIntervals.push(item.timeIndicatorsInterval);
        }
      }

      if(!item.pressed){
        item.pressed = true;
        Body.setPosition(button, {x: positionX+offsetX-Math.sign(offsetX)*unit*0.1/4, y: positionY+offsetY-Math.sign(offsetY)*unit*0.1/4});
        Body.scale(button, (axis=="y")?0.5:1, (axis=="x")?0.5:1);
      }

    }

    button.onCollideActive = (body)=>{
      if(body.is_bullet){
        return;
      }
      item.collided();
    };

    button.onCollide = (body)=>{
      if(body.is_bullet){
        return;
      }
      item.collided(true);
    };

    box = [box1, indicator, button, timeIndicator[0], timeIndicator[1], timeIndicator[2], timeIndicator[3]];
  }
  if(item.type == "machinegun"){
    machineguns.push(item);

    options.isSensor = true;

    options.render.fillStyle = "#00000022";
    var box1 = Bodies.rectangle(positionX, positionY, unit, unit, options);
    box1.render_static = true;

    options.render.fillStyle = "#00000022";
    var circle = Bodies.circle(positionX, positionY, unit/3, options);
    circle.render_static = true;

    options.render.fillStyle = "#000";
    var gun = Bodies.rectangle(positionX, positionY, unit*0.8, unit*0.2, options);
    gun.toReRender = unit*10;

    var indicator = Bodies.polygon(positionX, positionY, circuitColors[item.circuit || 0].shape, unit*scale/12, options);
    indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
    indicator.render.strokeStyle = circuitColors[item.circuit || 0].on;
    indicator.render.lineWidth = 1;

    item.matter_element_gun = gun;

    onCircuitChange(()=>{
      indicator.toReRenderPulse = 1;
      if(circuitState[item.circuit || 0]>0){
        item.on = true;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].on;
      }else{
        item.on = false;
        indicator.render.fillStyle = circuitColors[item.circuit || 0].off;
      }
    });

    gameIntervals.push(setInterval(()=>{
      if(!player || !item.on){
        return;
      }
      var distance = Math.sqrt(Math.pow(player.position.x - gun.position.x, 2) + Math.pow(player.position.y - gun.position.y, 2));
      var blocbetween = false;
      var angle = (gun.angle%(Math.PI*2)+Math.PI*2)%(Math.PI*2);
      if(angle<Math.PI/4 || angle>2*Math.PI-Math.PI/4){
        blocbetween = hasBlock(item.x+1, item.y);
      }else
      if(angle<Math.PI-Math.PI/4 && angle>Math.PI/4){
        blocbetween = hasBlock(item.x, item.y+1);
      }else
      if(angle<Math.PI+Math.PI/4 && angle>Math.PI-Math.PI/4){
        blocbetween = hasBlock(item.x-1, item.y);
      }else{
        blocbetween = hasBlock(item.x, item.y-1);
      }
      blocbetween = blocbetween && (blocbetween.type == "x" || blocbetween.type == "indicator" || blocbetween.type == "button" || blocbetween.type == "transporter" || blocbetween.type == "transistor" || blocbetween.type == "giver" || blocbetween.type == "and" || blocbetween.type == "bouncer");
      if(distance/unit < 10 && !player_is_dead && !blocbetween){
        options.render.fillStyle = "#FF0000";
        options.isStatic = false;
        options.isSensor = false;
        var bullet = Bodies.circle(positionX, positionY, unit/20, options);
        bullet.toReRender = unit*2;
        Body.setMass(bullet, 500);
        bullet.friction = 0;
        bullet.frictionAir = 0;
        bullet.is_bullet = true;
        bullet.not_collided = true;
        Body.setVelocity(bullet, {x: 10*Math.cos(gun.angle), y: 10*Math.sin(gun.angle)});
        setTimeout(()=>{
          World.remove(world, bullet);
        }, 1000);
        World.add(world, bullet);
      }
    }, 200));

    box = [box1, circle, gun, indicator];

  }

  if(item.type == "b"){
    options.render.fillStyle = "#333";
    options.isStatic = false;
    scale = 0.7;
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    box.toReRender = unit*2;
    Body.setMass(box, 0.5);
    item.onCollide = (body)=>{
      if(body.is_bullet){
        body.not_collided = false;
      }
    }
  }

  if(item.type == "c"){
    options.render.fillStyle = "#333";
    options.isStatic = false;
    scale = 0.7;
    box = Bodies.circle(positionX, positionY, unit*scale/2, options);
    box.toReRender = unit*2;
    //Body.setMass(box, 0.5);
    item.onCollide = (body)=>{
      if(body.is_bullet){
        body.not_collided = false;
      }
    }
  }

  if(item.type == "p"){
    options.render.fillStyle = "#000000";
    options.isStatic = false;
    scale = 0.8;
    box = Bodies.rectangle(positionX, positionY, unit*scale, unit*scale, options);
    player = box;

    box.toReRender = unit*3;

    item.onCollideEnd = ()=>{
      item.collideSensorTimout = setTimeout(()=>{
        item.allowed_jump = 0;
        item.matter_element.collided = false;
      }, 200);
      gameTimeouts.push(item.collideSensorTimout);
    };

    item.onCollide = (body)=>{
      if(body.is_bullet && body.not_collided && Math.sqrt(Math.pow(body.velocity.x, 2)+Math.pow(body.velocity.y, 2))>7){
        body.not_collided = false;
        player.render.fillStyle = "#FF0000";
        die("gun");
      }
      if((!body.isSensor && !body.noCollision) || (body.game_item && (body.game_item.type == "freejump" || body.game_item.type == "w"))){
        item.allowed_jump = 1;
        item.matter_element.collided = true;
      }
    };

    item.onCollideActive = (body)=>{
      if(!body.isSensor || (body.game_item && (body.game_item.type == "freejump" || body.game_item.type == "w"))){
        item.allowed_jump = 1;
        item.matter_element.collided = true;
      }
    };
  }

  if(item.type == "s"){
    options.render.fillStyle = "#686868";
    var ground = Bodies.rectangle(positionX+unit/2-unit*(item.inversed?0:1), positionY+unit, unit*scale*2, unit*scale, options);
    ground.render_static = true;

    options.render.fillStyle = "#22222200";
    options.render.visible = false;
    var ceil = Bodies.rectangle(positionX+unit/2-unit*(item.inversed?0:1), positionY-unit*2, unit*scale*2, unit*scale, options);
    ceil.render_static = true;
    var wall = Bodies.rectangle(positionX+unit*2-unit*4*(item.inversed?0:1), positionY-unit/2, unit*scale, unit*scale*4, options);
    wall.render_static = true;

    options.isSensor = true;
    options.render.fillStyle = "#E3E3E3";
    options.render.visible = true;
    var inner = Bodies.rectangle(positionX-unit*(item.inversed?0:1), positionY-unit/2, unit*scale, unit*scale*2, options);
    inner.toReRender = 0;
    inner.render_static = true;
    var inner2 = Bodies.rectangle(positionX+unit-unit*(item.inversed?0:1), positionY-unit/2, unit*scale, unit*scale*2, options);
    inner2.render_static = true;

    options.render.fillStyle = "#EEEEEE";
    var triangle = Bodies.polygon(positionX-unit+unit*2*(item.inversed?1:0), positionY, 3, unit/3, options);
    triangle.render_static = true;
    if(!item.inversed){
      Body.rotate(triangle, Math.PI);
    }

    box = [inner, inner2, ground, wall, ceil, triangle];
  }

  if(item.type == "e"){
    options.render.fillStyle = "#686868";
    var ground = Bodies.rectangle(positionX+unit/2-unit*(item.inversed?1:0), positionY+unit, unit*scale*2, unit*scale, options);

    options.render.fillStyle = "#22222200";
    options.render.visible = false;
    var wall = Bodies.rectangle(positionX+unit*2-unit*4*(item.inversed?1:0), positionY-unit/2, unit*scale, unit*scale*4, options);
    var wall2 = Bodies.rectangle(positionX-unit+unit*2*(item.inversed?1:0), positionY-unit/2, unit*scale, unit*scale*4, options);

    options.render.fillStyle = "#E3E3E3";
    options.isSensor = true;
    options.render.visible = true;
    var inner = Bodies.rectangle(positionX, positionY-unit/2, unit*scale, unit*scale*2, options);
    inner.toReRender = unit*5;
    inner.toReRenderPulse = 0;

    var inner2 = Bodies.rectangle(positionX+unit-unit*2*(item.inversed?1:0), positionY-unit/2, unit*scale, unit*scale*2, options);

    options.render.fillStyle = "#EEEEEE";
    var triangle = Bodies.polygon(positionX+unit-unit*2*(item.inversed?1:0), positionY, 3, unit/3, options);
    Body.rotate(triangle, Math.PI/2);

    box = [inner, inner2, ground, wall, triangle];

    inner.onCollideActive = (body)=>{
      if(inner2.doWithInner){
        inner.toReRenderPulse = 1;
        if(body.game_item.type=="p" && !player_is_dead){
          inner.isSensor = false;
          player.didFinishLevel = true;
          if(!inner2.didFinishLevel){
            inner2.didFinishLevel = true;
            finishLevel();
          }
          Body.setPosition(player, {x: player.position.x, y: player.position.y-5/(50/unit)});
          box.forEach((body)=>{
            Body.setPosition(body, {x: body.position.x, y: body.position.y-5/(50/unit)});
          });
        }
      }
    }

    inner2.onCollideEnd = (body)=>{
      if(body.game_item.type=="p" && !player_is_dead){
        inner2.doWithInner = true;
      }
    }

    inner2.onCollideActive = (body)=>{
      inner.toReRenderPulse = 1;
      if(body.game_item.type=="p" && !player_is_dead){
        inner.isSensor = false;
        player.didFinishLevel = true;
        if(!inner2.didFinishLevel){
          inner2.didFinishLevel = true;
          finishLevel();
        }
        Body.setPosition(player, {x: player.position.x, y: player.position.y-5/(50/unit)});
        box.forEach((body)=>{
          Body.setPosition(body, {x: body.position.x, y: body.position.y-5/(50/unit)});
        });
      }
    }

  }

  if(box){
    if(box.length){
      box.forEach((b)=>{
        b.game_item = item;
      });
    }else{
      box.game_item = item;
    }
    item.matter_element = box;
    World.add(world, box);
  }

}

function movePlayer(mousePosition, afterTimeout){

  if(player_is_dead || player.didFinishLevel){
    return;
  }

  var maxSpeed = 6/(50/unit);
  var coef = 4/(50/unit);
  var coefY = 1 + 2*engine.world.gravity.x * engine.world.gravity.scale * 1000;
  var coefX = 1 + engine.world.gravity.x * engine.world.gravity.scale * 1000;

  var speed = {x: Math.sign(player.position.x - mousePosition.x)*Math.min(maxSpeed, Math.abs(coefX*coef*(player.position.x - mousePosition.x)/unit)), y: Math.sign(player.position.y - mousePosition.y)*Math.min(maxSpeed, Math.abs(coefY*coef*(player.position.y - mousePosition.y)/unit))};

  if(player.game_item.allowed_jump>0){

    player.game_item.allowed_jump+=-1;

    Body.setVelocity(player, speed);

    var angularCoef = (Math.PI/4 - Math.abs(Math.PI/4 - Math.abs(Math.atan(speed.y/speed.x))  % (Math.PI/2))) / Math.PI/4;
    if(speed.x>0 && speed.y<0 || speed.x<0 && speed.y>0){
      Body.setAngularVelocity(player, 1 * angularCoef);
    }
    if(speed.x<0 && speed.y<0 || speed.x>0 && speed.y>0){
      Body.setAngularVelocity(player, -1 * angularCoef);
    }
  }else if(!afterTimeout){
    gameTimeouts.push(setTimeout(()=>{
      movePlayer(mousePosition, true);
    }, 100));
  }

}

var audio_music = null;
function runMusic(themes, i){

  var i = i%themes.length;

  if(!audio_music){
    audio_music = new Audio();
  }else{
    audio_music.pause();
  }

  if(!themes[i]){
    return;
  }

  audio_music.src = "musics/"+themes[i]+".wav";
  audio_music.play();
  audio_music.onended = ()=>{
    runMusic(themes, i+1);
  };
}

var audio = null;
function say(obj){
  document.getElementById("voice").innerHTML = obj.text;
  if(audio){
    audio.pause();
  }
  audio = new Audio();
  audio.src = "voice/"+obj.file;
  audio.play();
  audio.onerror = ()=>{
    setTimeout(()=>{
      if(document.getElementById("voice").innerHTML == obj.text){
        document.getElementById("voice").innerHTML = "";
      }
    }, obj.text.length*100);
  };
  audio.onended = ()=>{
    setTimeout(()=>{
      if(document.getElementById("voice").innerHTML == obj.text){
        document.getElementById("voice").innerHTML = "";
      }
    }, 2000);
  };
}

var audio_on = null;
function sound_on(){
  return;
  if(!audio_on){
    audio_on = new Audio();
    audio_on.src = "sounds/on.wav";
  }
  audio_on.currentTime = 0;
  audio_on.play();
}

function clearLevel(){

  player = undefined;
  circuitState = {};
  circuitStateCallbacks = [];
  player_is_dead = false;

  player = undefined;
  blocsByPosition = {};
  blocsList = [];
  offset_x = 0;
  offset_y = 0;
  width_x = 0;
  width_y = 0;
  tick = 0;
  machineguns = [];

  gameTimeouts.forEach((timeout)=>{
    if(timeout) clearTimeout(timeout);
  });
  gameTimeouts = [];

  gameIntervals.forEach((interval)=>{
    if(interval) clearInterval(interval);
  });
  gameIntervals = [];

  if(render && render.canvas && engine){
    render.canvas.remove();
    render.background_canvas.remove();
    render.foreground_canvas.remove();
    Matter.Render.stop(render);
    engine.events = {};
    World.clear(engine.world);
    Engine.clear(engine);
    Matter.Runner.stop(runner);
    runner = null;
  }
}

function initLevelWithData(data, voice){

  var data = JSON.parse(JSON.stringify(data));

  max_x = 0; max_y = 0; min_x = Infinity; min_y = Infinity;
  data.blocs.forEach((item)=>{
    if(item.type != "w" && item.type != "l" && item.type != "X" && item.type != "B" && item.type != "p" && item.type != "T"){
      max_x = Math.max(item.x+1, max_x);
      max_y = Math.max(item.y+1, max_y);
      min_x = Math.min(item.x, min_x);
      min_y = Math.min(item.y, min_y);
    }

    if(!blocsByPosition[item.y]){
      blocsByPosition[item.y] = {};
    }
    blocsByPosition[item.y][item.x] = item;
    blocsList.push(item);

  });
  offset_x = 0-min_x;
  offset_y = 0-min_y;
  width_x = max_x-min_x - 1;
  width_y = max_y-min_y + 1;

  scaleFactor = 3;
  unit = 60;

  if(width_x*unit/scaleFactor>clientWidth){
    scaleFactor = Math.ceil(1+width_x*unit/clientWidth);
  }

  if(width_y*unit/scaleFactor>clientHeight){
    scaleFactor = Math.ceil(1+width_y*unit/clientHeight);
  }

  var canvasWidth = clientWidth*scaleFactor;
  var canvasHeight = clientHeight*scaleFactor;

  document.getElementById("render").style.left = (clientWidth-canvasWidth/2)/2;
  document.getElementById("render").style.top = (clientHeight-canvasHeight/2)/2;

  engine = Engine.create();

  render = Render.create({
      element: document.getElementById("render"),
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        pixelRatio: 1// /(scaleFactor-1)
      }
  });

  unit = unit*2/scaleFactor;

  for(var i=0; i<document.getElementsByTagName("canvas").length; i++){
    var e = document.getElementsByTagName("canvas")[i];
    e.style.transform = "scale("+(1/2)+") translateX(-"+((2-1)*50)+"%) translateY(-"+((2-1)*50)+"%)";
  }

  // add mouse control
  var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      });

  Events.on(mouseConstraint, 'mousedown', function(event) {
    var mousePosition = {};

    mousePosition.x = (event.mouse.position.x)*2;//*scaleFactor;
    mousePosition.y = (event.mouse.position.y)*2;//*scaleFactor;

    var x = (mousePosition.x - clientWidth/2)/unit - offset_x + width_x/2;
    var y = (mousePosition.y - clientHeight/2)/unit - offset_y + width_y/2;
    var x_round = Math.round( x );
    var y_round = Math.round( y );
    if(blocsByPosition[y_round] && blocsByPosition[y_round][x_round]){
      if(blocsByPosition[y_round][x_round].onClick){
        blocsByPosition[y_round][x_round].onClick();
        return;
      }
    }
    if(player){
      movePlayer(mousePosition);
    }
  });

  runner = Engine.run(engine);
  Render.run(render);

  var fps = document.getElementsByClassName("js-fps")[0];

  Matter.Events.on(engine, "beforeUpdate", function() {

    //fps.innerHTML = runner.fps;

    tick++;
    var borderSize = width_x*unit*2*1;
    if(!player_is_dead && player && (player.position.x<0-borderSize || player.position.x>clientWidth*scaleFactor+borderSize || player.position.y<0-borderSize || player.position.y>clientHeight*scaleFactor+borderSize)){
      die("air");
    }

    machineguns.forEach((mg)=>{
      if(mg.on && player){
        var d = runner.delta;
        var e = mg.matter_element_gun;
        var perfectAngle = Math.atan((player.position.y-e.position.y)/(player.position.x-e.position.x));
        if(player.position.x-e.position.x<0){
          perfectAngle += Math.PI;
        }
        Body.rotate(e, (perfectAngle - e.angle)*1 +0*(d/300));
      }
    });

    engine.world.bodies.forEach((el)=>{
      if(el.is_bullet && el.not_collided){
        Body.applyForce(el, {x: el.position.x, y: el.position.y}, {x: 0, y: -engine.world.gravity.scale*el.mass})
      }
    });
  });

  Matter.Events.on(engine, "collisionStart", function(event) {
    event.pairs.forEach((pair) => {
      if(pair.bodyA.game_item){
        if(pair.bodyA.game_item.onCollide) pair.bodyA.game_item.onCollide(pair.bodyB, pair, event);
        if(pair.bodyA.onCollide) pair.bodyA.onCollide(pair.bodyB, pair, event);
      }
      if(pair.bodyB.game_item){
        if(pair.bodyB.game_item.onCollide) pair.bodyB.game_item.onCollide(pair.bodyA, pair, event);
        if(pair.bodyB.onCollide) pair.bodyB.onCollide(pair.bodyA, pair, event);
      }
    });
  });

  Matter.Events.on(engine, "collisionEnd", function(event) {
    event.pairs.forEach((pair) => {
      if(pair.bodyA.game_item){
        if(pair.bodyA.game_item.onCollideEnd) pair.bodyA.game_item.onCollideEnd(pair.bodyB, pair, event);
        if(pair.bodyA.onCollideEnd) pair.bodyA.onCollideEnd(pair.bodyB, pair, event);
      }
      if(pair.bodyB.game_item){
        if(pair.bodyB.game_item.onCollideEnd) pair.bodyB.game_item.onCollideEnd(pair.bodyA, pair, event);
        if(pair.bodyB.onCollideEnd) pair.bodyB.onCollideEnd(pair.bodyA, pair, event);
      }
    });
  });

  Matter.Events.on(engine, "collisionActive", function(event) {
    event.pairs.forEach((pair) => {
      if(pair.bodyA.game_item){
        if(pair.bodyA.game_item.onCollideActive) pair.bodyA.game_item.onCollideActive(pair.bodyB, pair, event);
        if(pair.bodyA.onCollideActive) pair.bodyA.onCollideActive(pair.bodyB, pair, event);
      }
      if(pair.bodyB.game_item){
        if(pair.bodyB.game_item.onCollideActive) pair.bodyB.game_item.onCollideActive(pair.bodyA, pair, event);
        if(pair.bodyB.onCollideActive) pair.bodyB.onCollideActive(pair.bodyA, pair, event);
      }
    });
  });

  data.blocs.forEach((item)=>{
    addBloc(engine.world, item.x, item.y, item);
  });

  circuitChange();

}

canChangeLevel = true;
function runLevel(index, levels){

  if(!canChangeLevel){
    return;
  }

  canChangeLevel = false;

  if(document.getElementsByClassName("active")[0]){
    document.getElementsByClassName("active")[0].classList.remove('active');
  }

  if(document.getElementsByClassName("stage_bloc_"+index)[0]){
    document.getElementsByClassName("stage_bloc_"+index)[0].classList.add('active');
  }

  if(max_level < index){
    if(max_level >= 0){
      document.getElementsByClassName("stage_bloc_"+max_level)[0].classList.remove('active');
      document.getElementsByClassName("stage_bloc_"+max_level)[0].classList.add('done');
    }
    max_level = index;

    localStorage.setItem("level", max_level);

    var stage = document.createElement("div");
    stage.classList = "stage_bloc "+"stage_bloc_"+max_level+" active";
    stage.innerHTML = max_level;
    stage.onclick = function(){
      runLevel(parseInt(this.innerHTML), levels);
      play();
    };
    document.getElementById("stages").appendChild(stage);
  }

  if(!levels[index] || levels[index].end){

    //Show credits
    document.getElementsByClassName("credit")[0].classList.add('visible');

    if(!levels[index]){
      document.getElementById("render").classList = "changeLevel";
      setTimeout(()=>{
        clearLevel();
      }, 500);
      return;
    }
  }else{
    document.getElementsByClassName("credit")[0].classList = "credit";
  }

  voiceTimeouts.forEach((timeout)=>{
    if(timeout) clearTimeout(timeout);
  });
  voiceTimeouts = [];
  levels[index].voice.forEach((v)=>{
    voiceTimeouts.push(setTimeout(()=>{
      if(v.text){
        say(v);
      }
      if(v.circuit !== undefined){
        circuitState[v.circuit] = 1;
        circuitChange();
      }
    }, v.delay));
  });


  document.getElementById("render").classList = "changeLevel";

  function levelToData(level, objects){
    var data = [];
    level.split("\n").forEach((line, y)=>{
      line.split('').forEach((bloc, x)=>{
        if(bloc != " "){
          if(objects[bloc]){
            var obj = JSON.parse(JSON.stringify(objects[bloc]));
            obj.x = x;
            obj.y = y;
            data.push(obj);
          }else{
            if(bloc=="w"){
              data.push({
                type: "w_back",
                x: x,
                y: y
              });
            }
            data.push({
              type: bloc,
              x: x,
              y: y
            });
          }
        }
      });
    });
    data = data.sort((a, b)=>{return (a.type=="w" || a.type=="l")?1:((b.type=="w" || b.type=="l")?-1:((a.type=="b" || a.type=="c" || a.type=="p")?1:-1))});
    return data;
  }

  var data = {
    blocs: levelToData(levels[index].map, levels[index].addons)
  };

  setTimeout(()=>{

    var col_r = 200 + ((index+1)/levels.length)*50;
    var col_g = 200 + ((index+1)/levels.length)*50;
    var col_b = 200 + ((index+1)/levels.length)*50;
    document.getElementsByTagName("body")[0].style.background = "linear-gradient(to bottom, rgb("+col_r+","+col_g+","+col_b+") 0%,rgb("+(col_r-10)+","+(col_g-10)+","+(col_b-10)+") 100%)";

    currentLevel = index;
    currentLevelData = data;
    clearLevel();
    initLevelWithData(data, levels[index].voice);
    canChangeLevel = true;
  }, 500);
  setTimeout(()=>{
    document.getElementById("render").classList = "";
  }, 600);

}

function resetLevel(){
  document.getElementById("render").classList = "resetLevel";
  setTimeout(()=>{
    clearLevel();
    initLevelWithData(currentLevelData, []);
  }, 200);
  setTimeout(()=>{
    document.getElementById("render").classList = "";
  }, 500);
}

function finishLevel(){
  runLevel(currentLevel+1, levels);
}

function die(reason){
  if(!player_is_dead){
    player_is_dead = true;
    setTimeout(()=>{
      resetLevel();
    }, 1000);
  }
}



if(max_level < 0){
  var savedLevel = localStorage.getItem("level");
  if(!savedLevel || savedLevel=="null"){
    savedLevel = 0;
  }
  max_level = savedLevel-1;

  for(var i=0; i<=max_level; i++){
    var stage = document.createElement("div");
    stage.classList = "stage_bloc "+"stage_bloc_"+i+" done";
    stage.innerHTML = i;
    var level = i;
    stage.onclick = function(){
      runLevel(parseInt(this.innerHTML), levels);
      play();
    };
    document.getElementById("stages").appendChild(stage);
  }
}

function play(){
  document.getElementById("gomenu").classList = "go-menu";
  document.getElementById("restart").classList = "restart";
  document.getElementById("mainmenu").classList = "main-menu hidden";
}

function menu(){
  document.getElementById("gomenu").classList = "go-menu hidden";
  document.getElementById("restart").classList = "restart hidden";
  document.getElementById("mainmenu").classList = "main-menu";
}

var music_is_on = false;
function toggleMusic(){
  if(music_is_on){
    music_is_on = false;
    runMusic("", 0);
    document.getElementById("music_toggle").classList = "music_toggle hidden";
  }else{
    music_is_on = true;
    runMusic(["Original", "Valse"], parseInt(max_level/20));
    document.getElementById("music_toggle").classList = "music_toggle";
  }
}
toggleMusic();


runLevel(max_level+1, levels);

//Items :
// generator: generate infinite energy or clock energy, parameters: repeat, circuit
// freejump: allow player to multi jump in air in front of freejump panels, parameters: none
// button: press button to activate circuit, parameters: circuit, timout, minTime, direction
// door: openable door, parameters: circuit, disableIndicator
// indicator: simple circuit LED
// transistor: a transistor with input, outA and outB controlled by circuit, parameters: input, outA, outB, circuit
// transistor (as inverser): if outA is not used
// antigravity: change gravity or disable gravity, parameters: circuit, direction (-1 for no gravity)
// transporter: convoyer, parameters: circuit, direction, inversed
// and: activate circuit if all andCircuits are active, parameters: andCircuits[], circuit
// giver: generate a cube or a circle in game, parameters: give (c or b), circuit, max
// bouncer or j: boucer, parameters: power
// machinegun: machine gun with a distance of 6 blocs, parameters: circuit
// w: water
// l: lava
// x: simple static wall
// b: rigid dynamic box
// c: rigid dynamic circle
// p: player
// e: end elevator
// s: start elevator

//TODO & ideas

// Teleporter
