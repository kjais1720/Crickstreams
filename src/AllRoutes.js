import { Routes, Route } from "react-router";
import {
  Home,
  NotFound,
  AppPages
} from "pages";

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<AppPages/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
