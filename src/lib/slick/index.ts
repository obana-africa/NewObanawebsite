export const logoSlickSettings = {
	dots: false,
	infinite: true,
	speed: 5000,
	autoplaySpeed: 30,
	slidesToShow: 5,
	slidesToScroll: 1,
	arrows: false,
	autoplay: true,
	cssEase: "linear",
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 1,
				infinite: true,
				dots: false,
			},
		},
		{
			breakpoint: 750,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 1,
				infinite: true,
				dots: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				initialSlide: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
	],
};

export const impactSlickSettings = {
	dots: false,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 3000,
	pauseOnHover: false,
	arrows: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
};
