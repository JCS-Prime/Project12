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

      <TextInput style={s.input} placeholder="Your name" value={visitor} onChangeText={(text) => {
      setVisitor(text);
       setError("");
}} />
      <TextInput
        style={s.input}
        placeholder="User ID (1-10)"
        keyboardType="number-pad"
        value={id}
        onChangeText={(text) => {
        setId(text);
         setError("");
}}
      />

      {error ? <Text style={s.error}>{error}</Text> : null}

      <Pressable style={s.button} onPress={handleSearch}>
        <Text style={s.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    justifyContent: "center",
    backgroundColor: "#0B1120",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 30,
    color: "#F8FAFC",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 18,
    backgroundColor: "#172033",
    color: "#F1F5F9",
    fontSize: 16,
  },

  error: {
    color: "#FB7185",
    marginBottom: 16,
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: 4,
  },

  button: {
    backgroundColor: "#10B981",
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    elevation: 5,
    shadowColor: "#10B981",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  buttonText: {
    color: "#052E24",
    fontWeight: "800",
    fontSize: 17,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
});
