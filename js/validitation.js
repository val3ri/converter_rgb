
function fromRGBto() {
  var r= document.getElementById("rbg_r_value").value;
  var g= document.getElementById("rbg_g_value").value;
  var b= document.getElementById("rbg_b_value").value;
  var rgb_options = document.getElementById("rgb_options");
  var option = rgb_options.options[rgb_options.selectedIndex].text;
  if(option == "HSL"){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    h = Math.round(h*360);
    s = Math.round(s*100);
    l = Math.round(l*100);

    document.getElementById('rgb_result').innerHTML = "".concat("H:",h.toString(),
                                                                  "; S:", s.toString(),
                                                                "; L:", l.toString());

  }
  else if(option == "HSV"){
    //Formula for rgb to HSV from Wiki
    r = r/255;
    g = g/255;
    b = b/255;
    var h,s;
    var v= Math.max(r,g,b)
    dif =  v - Math.min(r,g,b)
    if(dif == 0){
      h = 0;
      s = 0;
    }
    else{
      s = dif/v
      r1 = (v - r) / 6 / dif + 1 /2;
      g1 = (v - g) / 6 / dif + 1 /2;
      b1 = (v - b) / 6 / dif + 1 /2;
      if (r === v){
        h = b1 - g1;
      }
      else if(g === v){
        h = (1/3) + r1 - b1;
      }
      else if(b === v){
        h = (2/3) + g1 - r1;
      }
      if( h < 0 ){
        h +=1;
      }
      else if (h > 1) {
        h -=1;
      }
    }
    // need to be round? i dont know, looks better like this to me
    h = Math.round(h*360);
    s = Math.round(s*100);
    v = Math.round(v*100);
    document.getElementById('rgb_result').innerHTML = "".concat("H:",h.toString(),
                                                                "; S:", s.toString(),
                                                              "; V:", v.toString());
  }
  else if(option == "CMY"){
    r = r/255;
    g = g/255;
    b = b/255;

    var c_min = Math.min( 1 - r, 1 - g, 1 - b );

    var c = (1 - r - c_min) / (1 - c_min);
    var m = (1 - g - c_min) / (1 - c_min);
    var y = (1 - b - c_min) / (1 - c_min);

    c = Math.round(c*100);
    m = Math.round(m*100);
    y = Math.round(y*100);

    document.getElementById('rgb_result').innerHTML = "".concat("C:",c.toString(),
                                                                "; M:", m.toString(),
                                                              "; Y:", y.toString());

  }
}
