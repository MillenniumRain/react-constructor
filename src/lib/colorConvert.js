import { convert } from './utility';

export const colorConvert = {
	colorToRgba(color = '', toString = false) {
		if (!color) return '';
		const div = document.createElement('div');
		div.style.opacity = 1;
		div.style.background = color;

		document.body.append(div);
		const style = getComputedStyle(div);

		setTimeout(() => {
			div.remove();
		}, 0);

		const background = convert.stringToArrayOfNumbers(style.backgroundColor);
		if (background.length === 3) background.push(1);
		if (toString) return `rgba(${background.join(',')})`;
		return background;
	},
	rgbToHsv(r, g, b) {
		let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
		rabs = r / 255;
		gabs = g / 255;
		babs = b / 255;
		v = Math.max(rabs, gabs, babs);
		diff = v - Math.min(rabs, gabs, babs);
		diffc = (c) => (v - c) / 6 / diff + 1 / 2;
		percentRoundFn = (num) => Math.round(num * 100) / 100;
		if (diff == 0) {
			h = s = 0;
		} else {
			s = diff / v;
			rr = diffc(rabs);
			gg = diffc(gabs);
			bb = diffc(babs);

			if (rabs === v) {
				h = bb - gg;
			} else if (gabs === v) {
				h = 1 / 3 + rr - bb;
			} else if (babs === v) {
				h = 2 / 3 + gg - rr;
			}
			if (h < 0) {
				h += 1;
			} else if (h > 1) {
				h -= 1;
			}
		}
		return {
			h: Math.round(h * 360),
			s: percentRoundFn(s * 100),
			v: percentRoundFn(v * 100),
		};
	},
	hsvToRgb(H, S, V) {
		S /= 100;
		V /= 100;
		let lH = H === 360 ? 5 : Math.floor(H / 60);
		const f = H / 60 - lH;
		const p = V * (1 - S);
		const q = V * (1 - S * f);
		const t = V * (1 - (1 - f) * S);
		let R, G, B;
		switch (lH) {
			case 0:
				R = V;
				G = t;
				B = p;
				break;
			case 1:
				R = q;
				G = V;
				B = p;
				break;
			case 2:
				R = p;
				G = V;
				B = t;
				break;
			case 3:
				R = p;
				G = q;
				B = V;
				break;
			case 4:
				R = t;
				G = p;
				B = V;
				break;
			case 5:
				R = V;
				G = p;
				B = q;
				break;
		}
		return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
	},
	rgbToHex(R, G, B, A = 1) {
		const hex = [R, G, B, A * 255].map((val) => ('0' + Math.round(val).toString(16)).slice(-2));

		return `#${hex.join('')}`;
	},
};
