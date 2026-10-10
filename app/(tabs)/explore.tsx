import { useEffect, useState } from "react";
import { Text, FlatList, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

type User = { id: number; name: string; email: string };

export default function ExploreScreen() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error (${res.status})`);
        return res.json();
      })
      .then(setUsers)
      .catch((e) => e.name !== "AbortError" && setError(e.message))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#f59e0b" style={{ flex: 1 }} />;
  if (error) return <Text style={s.error}>⚠️ {error}</Text>;

  return (
    <FlatList
      style={{ backgroundColor: "#fffbeb" }}
      contentContainerStyle={{ padding: 16 }}
      data={users}
      keyExtractor={(u) => String(u.id)}
      renderItem={({ item }) => (
        <Pressable
          style={s.row}
          onPress={() =>
            router.push({ pathname: "/user/[id]", params: { id: String(item.id), visitor: "Guest" } })
          }
        >
          <Text style={s.name}>{item.name}</Text>
          <Text style={s.email}>{item.email}</Text>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  row: { backgroundColor: "#fff", padding: 14, borderRadius: 10, marginBottom: 10 },
  name: { fontWeight: "700", fontSize: 16 },
  email: { color: "#6b7280" },
  error: { color: "#dc2626", padding: 24, fontSize: 16 },
});