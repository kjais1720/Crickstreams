import { Routes, Route } from "react-router";
import { useState } from "react";
import { useAxios } from "utilities";
import {
  Home,
  WithSidebar
} from "pages";

export function AllRoutes() {
  const [apiUrl, setApiUrl] = useState("/api/categories");
  const { serverResponse, isLoading } = useAxios(apiUrl);
  const categories = serverResponse.data?.categories || [];

  return (
      <Routes>
        <Route path="/" element={<Home categories={categories} />} />
        <Route path="/*" element={<WithSidebar categories={categories} />} />
      </Routes>
  );
}
