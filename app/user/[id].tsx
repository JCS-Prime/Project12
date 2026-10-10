import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Pressable, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

type User = { id: number; name: string; email: string; phone: string; company: { name: string } };
type Post = { id: number; title: string };

export default function UserScreen() {
  const { id, visitor } = useLocalSearchParams<{ id: string; visitor: string }>();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError("");
      try {
        const base = "https://jsonplaceholder.typicode.com";
        const [uRes, pRes] = await Promise.all([
          fetch(`${base}/users/${id}`, { signal: controller.signal }),
          fetch(`${base}/posts?userId=${id}&_limit=3`, { signal: controller.signal }),
        ]);
        if (!uRes.ok || !pRes.ok) throw new Error(`Server error (${uRes.status})`);
        setUser(await uRes.json());
        setPosts(await pRes.json());
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message ?? "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();

    return () => controller.abort();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" color="#f59e0b" style={{ flex: 1 }} />;

  if (error)
    return (
      <View style={s.center}>
        <Text style={s.error}>⚠️ {error}</Text>
        <Pressable style={s.button} onPress={() => router.back()}>
          <Text style={s.buttonText}>Go back</Text>
        </Pressable>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Text style={s.hello}>Hi {visitor}! Here is user #{id}</Text>

      <View style={s.card}>
        <Text style={s.name}>{user?.name}</Text>
        <Text>📧 {user?.email}</Text>
        <Text>📞 {user?.phone}</Text>
        <Text>🏢 {user?.company.name}</Text>

        <Pressable style={s.like} onPress={() => setLikes((n) => n + 1)}>
          <Text style={s.buttonText}>👍 Like ({likes})</Text>
        </Pressable>
      </View>

      <Text style={s.section}>Recent posts</Text>
      {posts.map((p) => (
        <View key={p.id} style={s.post}>
          <Text>{p.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fffbeb", flexGrow: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  hello: { fontSize: 18, marginBottom: 14 },
  card: { backgroundColor: "#fff", padding: 16, borderRadius: 12, gap: 4, marginBottom: 20 },
  name: { fontSize: 22, fontWeight: "700" },
  like: { backgroundColor: "#f59e0b", padding: 10, borderRadius: 8, alignItems: "center", marginTop: 10 },
  section: { fontWeight: "700", fontSize: 16, marginBottom: 8 },
  post: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
  button: { backgroundColor: "#f59e0b", padding: 12, borderRadius: 10, marginTop: 12 },
  buttonText: { color: "#fff", fontWeight: "700" },
  error: { color: "#dc2626", fontSize: 16 },
});