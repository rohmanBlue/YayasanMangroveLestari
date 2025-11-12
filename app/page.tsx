import AppLayout from "./component/app";
import CarauselImg from "./component/carausel";

export default function HomePage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center">
        <CarauselImg />
      </div>
    </AppLayout>
  );
}
