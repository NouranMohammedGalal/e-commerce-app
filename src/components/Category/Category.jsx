import useApi from "../../Hooks/useApi";

export default function Category() {
  let { data, isLoading } = useApi("categories");
  let categoryList = data?.data?.data;
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
      {categoryList.map((category) => (
        <div key={category._id} className="text-center w-3/12">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-48 object-fill "
          />
          <h5> {category.name}</h5>
        </div>
      ))}
    </div>
  );
}
