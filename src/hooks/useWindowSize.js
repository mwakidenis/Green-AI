 export function useMyHook() {
-  // [PLACE SSR GUARD HERE for initial state]
-  const [data, setData] = useState(typeof window !== "undefined" ? window.someValue : null);
+  const readValue = () => (typeof window !== "undefined" ? window.someValue : null);
+  const [data, setData] = useState(readValue);

   useEffect(() => {
-    // [PLACE LOGIC HERE]
-    // This code only runs on the client.
-    if (typeof window !== "undefined") {
-      const handleEvent = () => console.log(window.innerWidth);
-      window.addEventListener('resize', handleEvent);
-      
-      return () => window.removeEventListener('resize', handleEvent);
-    }
+    if (typeof window === "undefined") return;
+    const handleEvent = () => setData(readValue());
+    handleEvent(); // sync once on mount
+    window.addEventListener("resize", handleEvent);
+    return () => window.removeEventListener("resize", handleEvent);
   }, []);
