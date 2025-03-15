import Slider from "react-slick";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";

export default function SimpleSlider() {
  const sliderImages = [img1, img2, img3];

  const sliderSettings = {
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="flex mx-auto">
      <div className="w-9/12">
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-96 object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-3/12 ">
        {[img1, img2].map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Sidebar Image ${index + 1}`}
              className="w-full h-48"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
