import * as React from 'react';
import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import { 
  Sparkles, Activity, Star, Microscope, ChevronRight, ShoppingBag, Leaf, ArrowRight 
} from 'lucide-react-native';

// --- INTERFACES ---
interface Brand {
  name: string;
  brandKey: string;
  desc: string;
  icon: React.ReactNode;
  path: string;
  accentColor: string;
}

// Ajuste de dimensiones con fallback para evitar errores de binario
const { width: windowWidth } = Dimensions.get('window');
const width = windowWidth || 375;

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga para asegurar que el motor de JS esté listo
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const subBrands: Brand[] = [
    { name: 'Ginga Derma', brandKey: 'GINGA_DERMA', desc: 'Skincare Clínico', icon: <Activity color="#173831" size={24}/>, path: '/derma', accentColor: '#00FF41' },
    { name: 'Ginga Studio', brandKey: 'GINGA_STUDIO', desc: 'Maquillaje Profesional', icon: <Star color="#173831" size={24}/>, path: '/studio', accentColor: '#FF3131' },
    { name: 'Ginga Lab', brandKey: 'GINGA_LAB', desc: 'Fórmulas Técnicas', icon: <Microscope color="#173831" size={24}/>, path: '/lab', accentColor: '#A020F0' },
    { name: 'Ginga Expert', brandKey: 'EXPERT', desc: 'Asesor Virtual AI', icon: <Sparkles color="#173831" size={24}/>, path: '/expert', accentColor: '#0070FF' },
  ];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#173831" />
        <Text style={{ marginTop: 10, color: '#173831' }}>Cargando Ginga Shop...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- HERO SECTION --- */}
        <View style={styles.hero}>
          <View style={styles.leafBg}>
            <Leaf size={width * 0.8} color="#173831" opacity={0.05} />
          </View>

          <View style={styles.badge}>
            <Sparkles size={12} color="#8CB79B" />
            <Text style={styles.badgeText}>PUREZA & CIENCIA CONSCIENTE_</Text>
          </View>

          <Text style={styles.heroTitle}>
            Skin <Text style={styles.heroTitleLight}>Balance</Text>
          </Text>

          <Text style={styles.heroSubtitle}>
            Tu piel, tu naturaleza. Analizada por <Text style={styles.bold}>Expertos AI</Text>.
          </Text>

          <TouchableOpacity style={styles.mainButton} activeOpacity={0.8}>
            <Text style={styles.mainButtonText}>REALIZAR TEST DE PIEL</Text>
            <ArrowRight size={16} color="white" />
          </TouchableOpacity>

          {/* --- SUB-BRANDS GRID --- */}
          <View style={styles.brandGrid}>
            {subBrands.map((brand) => (
              <TouchableOpacity key={brand.brandKey} style={styles.brandCard}>
                <View style={[styles.iconContainer, { borderLeftWidth: 3, borderLeftColor: brand.accentColor }]}>
                  {brand.icon}
                </View>
                <Text style={styles.brandName}>{brand.name}</Text>
                <Text style={styles.brandDesc}>{brand.desc}</Text>
                <View style={styles.exploreRow}>
                  <Text style={styles.exploreText}>EXPLORAR</Text>
                  <ChevronRight size={12} color="#173831" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* --- SECCIÓN PRODUCTOS --- */}
        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.iconBox}>
                <ShoppingBag size={20} color="#8CB79B" />
              </View>
              <Text style={styles.sectionTitle}>GINGA <Text style={styles.notItalic}>SHOP</Text></Text>
            </View>
            <Text style={styles.sectionSubtitle}>CURADURÍA EXCLUSIVA PARA EL BIENESTAR_</Text>
          </View>
          
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>Carga de productos aquí...</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'android' ? 30 : 0 
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F9F3' },
  hero: { 
    backgroundColor: '#F1F9F3', 
    paddingVertical: 40, 
    paddingHorizontal: 20, 
    alignItems: 'center', 
    overflow: 'hidden' 
  },
  leafBg: { position: 'absolute', left: -width * 0.2, top: 0 },
  badge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white', 
    paddingHorizontal: 15, 
    paddingVertical: 8, 
    borderRadius: 20, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(140,183,155,0.2)' 
  },
  badgeText: { fontSize: 9, fontWeight: '900', color: '#173831', letterSpacing: 1.5, marginLeft: 6 },
  heroTitle: { fontSize: 44, fontWeight: '900', color: '#051F20', textAlign: 'center', marginBottom: 10 },
  heroTitleLight: { color: 'rgba(140,183,155,0.7)', fontWeight: '500' },
  heroSubtitle: { fontSize: 16, color: '#4A6352', textAlign: 'center', marginBottom: 30, paddingHorizontal: 20 },
  bold: { fontWeight: 'bold', color: '#051F20' },
  mainButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#173831', 
    paddingHorizontal: 25, 
    paddingVertical: 18, 
    borderRadius: 16, 
    marginBottom: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mainButtonText: { color: 'white', fontWeight: '900', fontSize: 11, letterSpacing: 1.5, marginRight: 10 },
  brandGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  brandCard: { 
    width: '48%', 
    backgroundColor: 'white', 
    borderRadius: 24, 
    padding: 16, 
    marginBottom: 15, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 10, 
    elevation: 2 
  },
  iconContainer: { 
    width: 50, 
    height: 50, 
    backgroundColor: '#F8FBF9', 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  brandName: { fontSize: 10, fontWeight: '900', color: '#051F20', marginBottom: 4, textAlign: 'center' },
  brandDesc: { fontSize: 9, color: '#4A6352', opacity: 0.6, marginBottom: 12, textAlign: 'center' },
  exploreRow: { flexDirection: 'row', alignItems: 'center' },
  exploreText: { fontSize: 9, fontWeight: '900', color: '#173831', marginRight: 4 },
  content: { padding: 20 },
  sectionHeader: { marginBottom: 20 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  iconBox: { padding: 8, backgroundColor: '#F1F9F3', borderRadius: 8, marginRight: 10 },
  sectionTitle: { fontSize: 24, fontWeight: '900', color: '#051F20', fontStyle: 'italic' },
  notItalic: { fontStyle: 'normal', color: '#8CB79B' },
  sectionSubtitle: { fontSize: 9, fontWeight: '700', color: '#8CB79B', marginLeft: 42 },
  placeholderCard: { 
    height: 150, 
    backgroundColor: '#F9F9F9', 
    borderRadius: 20, 
    borderStyle: 'dashed', 
    borderWidth: 1, 
    borderColor: '#CCC', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20 
  },
  placeholderText: { color: '#999', fontSize: 12 }
});

export default HomePage;