export const products = [
    {
        id: 1,
        name: "Auriculares Noise Cancelling Pro",
        price: 45000,
        category: "Audio",
        type: "technology",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
        isNew: true,
        description: "Sumérgete en el sonido con nuestra mejor cancelación de ruido activa. Ideales para viajes y oficina.",
        specs: [
            { label: "Duración de batería", value: "30 horas" },
            { label: "Conectividad", value: "Bluetooth 5.2" },
            { label: "Peso", value: "250g" },
            { label: "Cancelación de ruido", value: "Activa (ANC)" }
        ],
        stock: 15,
        variants: [
            { type: "color", options: ["Negro Mate", "Plata", "Azul Noche"] }
        ]
    },
    {
        id: 2,
        name: "Smartwatch Elite Series 5",
        price: 60000,
        category: "Wearables",
        type: "technology",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
        isNew: true,
        description: "Monitoreo de salud avanzado y diseño elegante para tu muñeca. Detecta caídas y ritmo cardiaco irregular.",
        specs: [
            { label: "Pantalla", value: "OLED Always-On" },
            { label: "Resistencia al agua", value: "50m" },
            { label: "Sensores", value: "SpO2, ECG, Ritmo Cardíaco" }
        ],
        isOffer: true,
        originalPrice: 80000,
        stock: 8,
        variants: [
            { type: "color", options: ["Negro", "Oro Rosa", "Plata"] },
            { type: "size", options: ["40mm", "44mm"] }
        ]
    },
    {
        id: 3,
        name: "Laptop Ultrabook X1",
        price: 800000,
        category: "Computación",
        type: "technology",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
        isNew: false,
        description: "Potencia y portabilidad para profesionales y estudiantes. Diseño unibody de aluminio.",
        specs: [
            { label: "Procesador", value: "M3 Pro" },
            { label: "RAM", value: "16GB / 32GB" },
            { label: "Almacenamiento", value: "512GB SSD" }
        ],
        stock: 5,
        variants: [
            { type: "color", options: ["Gris Espacial", "Plata"] },
            { type: "capacity", options: ["512GB", "1TB", "2TB"] }
        ]
    },
    {
        id: 4,
        name: "Combo Gamer Pro",
        price: 150000,
        category: "Gaming",
        type: "combo",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80",
        isNew: true,
        description: "Todo lo que necesitas para empezar a ganar: Teclado Mecánico + Mouse RGB + Headset.",
        specs: [
            { label: "Teclado", value: "Switch Blue, RGB" },
            { label: "Mouse", value: "16000 DPI" },
            { label: "Headset", value: "7.1 Surround" }
        ],
        stock: 20,
        variants: [
            { type: "edition", options: ["Edición Roja", "Edición Azul"] }
        ]
    },
    {
        id: 5,
        name: "Servicio de Instalación Premium",
        price: 50000,
        category: "Servicios",
        type: "service",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?w=500&q=80",
        isNew: false,
        description: "Nuestros expertos instalan y configuran tus dispositivos en tu domicilio.",
        specs: [
            { label: "Duración", value: "1-2 horas" },
            { label: "Cobertura", value: "Zona Metropolitana" }
        ],
        stock: 999, // Service usually has high availability
        variants: []
    },
    {
        id: 6,
        name: "Smartphone Flagship 2026",
        price: 950000,
        category: "Móviles",
        type: "technology",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
        isNew: true,
        description: "La mejor cámara y procesador del mercado en un diseño ultra-fino.",
        specs: [
            { label: "Cámara", value: "200MP Main" },
            { label: "Pantalla", value: "120Hz LTPO" },
            { label: "Batería", value: "5000mAh" }
        ],
        stock: 3,
        variants: [
            { type: "color", options: ["Titanio", "Negro", "Azul"] },
            { type: "capacity", options: ["256GB", "512GB"] }
        ]
    }
];
