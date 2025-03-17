export const getTestimonialPositions = (
	currentIndex: number,
	testimonialsLength: number
) => {
	const positions = [];

	for (let i = 0; i < testimonialsLength; i++) {
		const index = (currentIndex + i) % testimonialsLength;

		let x = 0,
			y = 0,
			scale = 1,
			opacity = 1,
			zIndex = 1,
			rotation = 0;

		if (i === 0) {
			x = 0;
			y = 0;
			scale = 1.1;
			opacity = 1;
			zIndex = 10;
		} else if (i === 1) {
			x = 290;
			y = 8;
			scale = 1;
			opacity = 0.8;
			zIndex = 5;
			rotation = 5;
		} else if (i === 2) {
			x = 440;
			y = 100;
			scale = 0.7;
			opacity = 0.6;
			zIndex = 4;
			rotation = 10;
		} else if (i === testimonialsLength - 1) {
			x = -290;
			y = 8;
			scale = 1;
			opacity = 0.8;
			zIndex = 5;
			rotation = -5;
		} else if (i === testimonialsLength - 2) {
			x = -440;
			y = 100;
			scale = 0.7;
			opacity = 0.6;
			zIndex = 4;
			rotation = -10;
		} else {
			x = 0;
			y = 0;
			scale = 0;
			opacity = 0;
			zIndex = 0;
			rotation = 0;
		}

		positions.push({
			index,
			x,
			y,
			scale,
			opacity,
			zIndex,
			rotation,
			isCurrent: i === 0,
		});
	}

	return positions;
};
