
var ctx, imgData, canvas;
var scale = 200;
canvas = document.getElementById("cnvs");
ctx = canvas.getContext("2d");

function setPixel(x, y, c)
{
	/*
		Устанавливает пиксель с координатой (x, y) с цветом c
	*/
	var index = 4 * (x + canvas.width * y);  // получаем индекс пикселя
    imgData.data[index + 0] = c.r;
    imgData.data[index + 1] = c.g;
    imgData.data[index + 2] = c.b;
    imgData.data[index + 3] = c.a;
    return c;
}


function Rastr(x, y, z)
{
	var xs, ys // экранные координаты
    var  k;  // масштаб и расстояние до наблюдателя
    var i_D, lx, ly, lz; // Координаты источника света и диффузное освещение

	k = -5;
	lx = 0.1, ly = 0.5,	lz = 1;
	// Перспективная проекция, масштаб и сдвиг в середину области рисования
	xs = Math.round(k * x /(z + k) * scale) + 300;
	ys = Math.round(k * y /(z + k) * scale) + 300;

	// Расчет рассеивающего освещения по формуле Ламберта
	i_D = (x * lx + y * ly + z * lz);

	if (i_D > 0)
		setPixel(xs, ys, {r:Math.round(295*i_D), g: Math.round(255*i_D), b: Math.round(255*i_D), a: 255});
	else
		setPixel(xs, ys, {r: 0, g: 0, b: 0, a:255}); // Фоновое освещение
}


function calc_coords()
{

	// Расчет координат x, y, z по уравнению сферы. Растеризация каждой точки
	var x, y, z;
	x = -1.0;
	while (x <= 1.0)
	{
		y = -1.0;
		while (y <= 1.0)
		{
			if (1.0 - x * x - y * y >= 0)
			{
				z = Math.sqrt(1.0 - x * x - y * y);
				Rastr(x, y, z);
			}
			y += 0.003;

		}
		x += 0.003;
	}
}


function draw()
{
    imgData = ctx.createImageData(600, 600);
    ctx.putImageData(imgData, 0, 0);
    calc_coords();  // вызываем функцию отрисовки
	ctx.putImageData(imgData, 0, 0);
}

function plus(){
	if (scale >= 25){
		scale -= 5
		ctx.clearRect(0,0,600,600);
		draw()
		}
}

function minus(){
	if (scale <= 225){
		scale += 5
		ctx.clearRect(0,0,600,600);
		draw()
		}
}

draw()
