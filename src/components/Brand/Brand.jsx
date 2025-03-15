import useApi from "../../Hooks/useApi";

export default function Brands() {
  let { data, isLoading } = useApi("brands");
  let brandList = data?.data?.data;
  console.log(data);
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-200">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap">
      {brandList.map((brand) => (
        <div key={brand._id} className="text-center w-3/12">
          <img
            src={brand.image}
            alt={brand.name}
            className="w-full h-48 object-fill "
          />
          <h5> {brand.name}</h5>
        </div>
      ))}
    </div>
  );
}
