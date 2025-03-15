import amazonPayLogo from "/images/amazon-pay-logo.svg.png";
import masterCardLogo from "/images/master-card-logo.svg.png";
import payPalLogo from "/images/PayPal-logo.svg.webp";
import appStoreLogo from "/images/app-store-logo.svg";
import googlePlayLogo from "/images/google-play-logo.svg";
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto">
        <form className="w-full">
          <label className="block mb-2 text-3xl font-medium">
            Get the FreshCart app
          </label>
          <p className="text-gray-600 text-lg">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex p-6 items-center space-x-6 ">
            <input
              type="email"
              className="p-2 border border-gray-300 rounded w-80 flex-grow"
              placeholder="Email .."
            />
            <button
              type="submit"
              className="bg-active text-white text-lg px-4 py-2 rounded hover:bg-green-600"
            >
              Share App Link
            </button>
          </div>
        </form>
        <div className="w-full border-t border-gray-300"></div>

        <div className="flex justify-between items-center md:flex-row flex-col">
          <div className="flex items-center space-x-4 m-6">
            <h1 className="text-xl font-medium text-gray-950">
              Payment Partners
            </h1>

            <img
              src={amazonPayLogo}
              alt="Amazon Pay"
              className="w-16 object-contain p-1"
            />
            <img
              src={masterCardLogo}
              alt="MasterCard"
              className="w-10 object-contain p-1"
            />
            <img
              src={payPalLogo}
              alt="PayPal"
              className="w-16 object-contain p-1"
            />
          </div>
          <div className="flex justify-center items-center space-x-4 m-6">
            <h2 className="text-xl font-medium text-gray-950">
              Get deliveries with FreshCart
            </h2>

            <img
              src={appStoreLogo}
              alt="App Store"
              className="w-24 object-contain"
            />
            <img
              src={googlePlayLogo}
              alt="Google Play"
              className="w-24 object-contain"
            />
          </div>
        </div>
        <div className="w-full border-t border-gray-300 mt-4"></div>
      </div>
    </footer>
  );
}
