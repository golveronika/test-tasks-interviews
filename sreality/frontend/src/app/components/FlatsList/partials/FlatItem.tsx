import FlatImageSlider from "./FlatImageSlider";

interface IFlatItemProps {
  flat: IFlat;
}

const FlatItem = ({ flat }: IFlatItemProps) => {
  return (
    <div className="flat-item-wrapper">
      <div>
        <FlatImageSlider images={flat.images} />
      </div>
      <div className="p-1">
        <a
          className="flat-link fw-medium ink-opacity-50-hover text-danger"
          target="_blank"
          href={flat.webLink}
          rel="noreferrer"
        >
          {flat.name}
        </a>
      </div>
      <div className="p-1">
        <span className="text-dark fs-5">{flat.locality}</span>
      </div>
      <div className="p-1">
        <span className="fw-medium">{`${flat.price} Kč`}</span>
      </div>
    </div>
  );
};

export default FlatItem;
