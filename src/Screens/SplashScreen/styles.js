import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      },
      logoText: {
        fontSize: 23,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textShadowColor: "rgba(150, 150, 150, 0.85)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 5,
      },
      redText: {
        fontSize: 60,
        color: "#AA1A1A",
        fontWeight: "bold",
      },
      largeText: {
        fontSize: 45,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      withPastor: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginLeft: 22,
        textShadowColor: "rgba(150, 150, 150, 0.85)",
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 5,
      },
});

export default styles;
