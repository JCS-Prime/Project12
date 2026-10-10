
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [visitor, setVisitor] = useState("");
  const [id, setId] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    const userId = id.trim();

    if (!visitor.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!userId) {
      setError("Please enter a user ID.");
      return;
    }

    const numberId = Number(userId);

    if (
      !/^\d+$/.test(userId) ||
      !Number.isInteger(numberId) ||
      numberId < 1 ||
      numberId > 10
    ) {
      setError("User ID must be between 1 and 10.");
      return;
    }

    setError("");
    Keyboard.dismiss();

    router.push({
      pathname: "/user/[id]",
      params: { id: String(numberId) },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Finder</Text>

      <Text style={styles.subtitle}>
        Search for users using their ID
      </Text>

      <Text style={styles.label}>Your Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={visitor}
        onChangeText={(value) => {
          setVisitor(value);
          setError("");
        }}
      />

      <Text style={styles.label}>User ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ID (1-10)"
        keyboardType="number-pad"
        value={id}
        maxLength={2}
        onChangeText={(value) => {
          setId(value);
          setError("");
        }}
        onSubmitEditing={handleSearch}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
        onPress={handleSearch}
        accessibilityRole="button"
        accessibilityLabel="Search user"
      >
        <Text style={styles.buttonText}>
          Search User
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 28,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#ffffff",
    marginBottom: 18,
  },
  error: {
    color: "#dc2626",
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
