import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#173831" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      
      {/* HERO */}
      <View style={{ padding: 30, alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: '900' }}>
          Skin Balance
        </Text>

        <Text style={{ marginTop: 10, textAlign: 'center' }}>
          Tu piel, tu naturaleza. Analizada por Expertos AI.
        </Text>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity
        style={{
          backgroundColor: '#173831',
          padding: 15,
          margin: 20,
          borderRadius: 10,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          Realizar test
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}