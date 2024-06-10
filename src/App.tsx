import { ErrorBoundary } from "react-error-boundary";
import MainLayout from "./components/layout/MainLayout";
import Error from "./pages/Error/Error.page";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <MainLayout />
    </ErrorBoundary>
  );
};

export default App;
