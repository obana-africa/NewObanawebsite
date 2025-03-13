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
