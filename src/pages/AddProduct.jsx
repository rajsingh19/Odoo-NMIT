import { useState } from "react";
import { useNavigate } from "react-router-dom";
import categories from "../data/categories";
import { useData } from "../context/DataContext";

export default function AddProduct() {
  const { addProduct } = useData();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState(""); // city/area
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const nav = useNavigate();

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      setCoords({ lat: latitude, lng: longitude });

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();
        setLocation(
          data.address.city ||
            data.address.town ||
            data.address.state ||
            "Unknown"
        );
      } catch (e) {
        console.error(e);
        setLocation(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const p = addProduct({
      title,
      category,
      description,
      price: Number(price),
      imageUrl,
      location,
      lat: coords.lat,
      lng: coords.lng,
    });
    nav(`/product/${p.id}`);
  };

  return (
    <div className="container-app max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={onSubmit} className="card grid gap-3">
        {/* Title */}
        <div>
          <label className="label">Product Title</label>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="label">Category</label>
          <select
            className="input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Price (₹)</label>
          <input
            className="input"
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL (optional)</label>
          <input
            className="input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image URL"
          />
        </div>
        <div>
          <label className="label">Preview</label>
          <div className="aspect-[4/3] rounded-xl bg-neutral-100 grid place-items-center text-neutral-500 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="object-cover w-full h-full rounded-xl"
              />
            ) : (
              "Image Placeholder"
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="label">Location</label>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter or detect location"
            />
            <button
              type="button"
              className="btn btn-muted"
              onClick={detectLocation}
            >
              📍 Detect
            </button>
          </div>
          {coords.lat && (
            <p className="text-sm text-neutral-600 mt-1">
              Detected: {coords.lat.toFixed(2)}, {coords.lng.toFixed(2)}
            </p>
          )}
        </div>

        {/* Submit */}
        <button className="btn btn-primary w-full mt-2">
          Submit Listing
        </button>
      </form>
    </div>
  );
}
