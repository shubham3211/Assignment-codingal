import { useEffect, useState } from "react";
import { PassengerEndPoint } from "../utils";

interface IPassenger {
  _id: string;
  name: string;
}

const useGetPassenger = ({ page }: { page: number }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passengers, setPassengers] = useState<IPassenger[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    fetch(`${PassengerEndPoint}?page=${page}&size=10`, {
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((response: { data: IPassenger[]; totalPages: number }) => {
        setPassengers((passengersArr) => [...passengersArr, ...response.data]);
        if (response.totalPages <= page) {
          setHasMore(false);
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page]);

  return { loading, error, passengers, hasMore };
};

export default useGetPassenger;
