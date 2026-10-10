import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [visitor, setVisitor] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    const num = Number(id);
    if (!visitor.trim()) return setError("Please enter your name.");
    if (!Number.isInteger(num) || num < 1 || num > 10)
      return setError("User ID must be a number from 1 to 10.");

    setError("");
    router.push({ pathname: "/user/[id]", params: { id: String(num), visitor: visitor.trim() } });
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Find a user 👤</Text>

      <TextInput style={s.input} placeholder="Your name" value={visitor} onChangeText={setVisitor} />
      <TextInput
        style={s.input}
        placeholder="User ID (1-10)"
        keyboardType="number-pad"
        value={id}
        onChangeText={setId}
      />

      {error ? <Text style={s.error}>{error}</Text> : null}

      <Pressable style={s.button} onPress={handleSearch}>
        <Text style={s.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center", backgroundColor: "#fffbeb" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#d1d5db", borderRadius: 10, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  error: { color: "#dc2626", marginBottom: 12 },
  button: { backgroundColor: "#f59e0b", padding: 14, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});