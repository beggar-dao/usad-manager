import { useState } from "react";

export default function GlobalModel() {
  const [loading, setLoading] = useState(false);
  return {
    loading,
    setLoading,
  };
}
