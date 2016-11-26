function fromRGBto() {
    //get value R, G, B and converting option
    var r = document.getElementById("rgb_r_value").value;
    var g = document.getElementById("rgb_g_value").value;
    var b = document.getElementById("rgb_b_value").value;
    var rgb_options = document.getElementById("rgb_options");
    var option = rgb_options.options[rgb_options.selectedIndex].text;

    //controll if the are some invalid inputs
    if (isNaN(Number(r)) || isNaN(Number(g)) || isNaN(Number(b))) {
        document.getElementById('rgb_result').innerHTML = "Non a valid input";
    }
    else {
        if (option == "HSL") {
            r = r / 255;
            g = g / 255;
            b = b / 255;
            //define min and max of the triple
            var c_max = Math.max(r, g, b);
            var c_min = Math.min(r, g, b);
            var h, s;
            var l = (c_max + c_min) / 2;

            if (c_max == c_min) {
                h = s = 0; // achromatic
            } else {
                //define delta
                var d = c_max - c_min;
                s = l > 0.5 ? d / (2 - c_max - c_min) : d / (c_max + c_min);
                switch (c_max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            //rounding for better understanding
            h = Math.round(h * 360);
            s = Math.round(s * 100);
            l = Math.round(l * 100);

            document.getElementById('rgb_result').innerHTML = "".concat("H:", h.toString(),
                "; S:", s.toString(),
                "; L:", l.toString());
        }
        else if (option == "HSV") {
            //Formula for rgb to HSV from Wiki
            r = r / 255;
            g = g / 255;
            b = b / 255;
            var h, s;
            var v = Math.max(r, g, b)
            dif = v - Math.min(r, g, b)
            if (dif == 0) {
                h = 0;
                s = 0;
            }
            else {
                s = dif / v
                r1 = (v - r) / 6 / dif + 1 / 2;
                g1 = (v - g) / 6 / dif + 1 / 2;
                b1 = (v - b) / 6 / dif + 1 / 2;
                if (r === v) {
                    h = b1 - g1;
                }
                else if (g === v) {
                    h = (1 / 3) + r1 - b1;
                }
                else if (b === v) {
                    h = (2 / 3) + g1 - r1;
                }
                if (h < 0) {
                    h += 1;
                }
                else if (h > 1) {
                    h -= 1;
                }
            }
            // need to be round? i dont know, looks better like this to me
            h = Math.round(h * 360);
            s = Math.round(s * 100);
            v = Math.round(v * 100);
            document.getElementById('rgb_result').innerHTML = "".concat("H:", h.toString(),
                "; S:", s.toString(),
                "; V:", v.toString());
        }
        else if (option == "CMY") {
            r = r / 255;
            g = g / 255;
            b = b / 255;

            var c_min = Math.min(1 - r, 1 - g, 1 - b);

            var c = (1 - r - c_min) / (1 - c_min);
            var m = (1 - g - c_min) / (1 - c_min);
            var y = (1 - b - c_min) / (1 - c_min);

            c = Math.round(c * 100);
            m = Math.round(m * 100);
            y = Math.round(y * 100);

            document.getElementById('rgb_result').innerHTML = "".concat("C:", c.toString(),
                "; M:", m.toString(),
                "; Y:", y.toString());
        }
        else if (option == "sRGB") {
            r = r / 255;
            g = g / 255;
            b = b / 255;
        }
    }


}

function fromCIEXYZtosRGB() {
    var x = document.getElementById("xyz_x_value").value;
    var y = document.getElementById("xyz_y_value").value;
    var z = document.getElementById("xyz_z_value").value;

}

function fromCIEXYZto() {
    var x = document.getElementById("xyz_x_value").value;
    var y = document.getElementById("xyz_y_value").value;
    var z = document.getElementById("xyz_z_value").value;
    var rgb_options = document.getElementById("xyz_options");
    var option = rgb_options.options[rgb_options.selectedIndex].text;

    if (option == "CIELab") {
        x = x / 95.047; // With Weißpunkt D65
        y = y / 100.0;
        z = z / 108.883;

        //Calculte new X
        if (x > 0.008856) {
            x = Math.pow(x, (1 / 3))
        }
        else {
            x = ( 7.787 * x ) + ( 16 / 116 )
        }
        //Calculte new Y
        if (y > 0.008856) {
            y = Math.pow(y, (1 / 3))
        }
        else {
            y = ( 7.787 * y ) + ( 16 / 116 )
        }
        //Calculte new Z
        if (z > 0.008856) {
            z = Math.pow(z, (1 / 3))
        }
        else {
            z = ( 7.787 * z ) + ( 16 / 116 )
        }

        //Calculate l, a, b
        var l = (116 * y) - 16
        var a = 500 * (x - y)
        var b = 200 * (y - z)

        assert("l:" + l + " a:" + a + " b:" + b)
    }
    else if (option == "CIELuv") {
        x = x / 255;
        y = x / 255;
        z = z / 255;

        var u1 = (4 * x) / (-2 * x + 12 * y + 3);
        var v1 = (9 * y) / (-2 * x + 12 * y + 3);

        var l = 116 * (Math.pow(y / 100), 1 / 3) - 16;
        var u = 116 * l * (u1 - 0.2009);
        var v = 13 * l * (v1 - 0.4610);
    }


}