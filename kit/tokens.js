window.__GROTHOUSE_TOKENS__ = {
  "$schema": "./tokens.schema.json",
  "name": "Grothouse Family Design System",
  "version": "1.0.0",
  "description": "Multi-entity design system. One shared radiance language, 24 distinct entity skins. Swap tokens to reskin.",
  "base": {
    "grey": {
      "slate": "#757C88",
      "stone": "#59788E",
      "spruce": "#2C3E4C",
      "mist": "#B8BCC8",
      "fog": "#D8DCE4"
    },
    "fonts": {
      "display": "Source Serif 4",
      "body": "Outfit",
      "mono": "JetBrains Mono"
    },
    "radii": {
      "sm": 4,
      "md": 6,
      "lg": 10,
      "xl": 16
    },
    "spacing": {
      "section": 120,
      "sectionSm": 80,
      "card": 28
    }
  },
  "archetypes": {
    "holding": {
      "character": "authoritative, austere, architectural",
      "animationSpeed": 1,
      "motion": "smooth",
      "borderStyle": "hairline",
      "radiiScale": 1
    },
    "financial": {
      "character": "disciplined, precise, restrained",
      "animationSpeed": 0.85,
      "motion": "smooth",
      "borderStyle": "hairline",
      "radiiScale": 0.8
    },
    "real_estate": {
      "character": "grounded, enduring, tactile",
      "animationSpeed": 0.8,
      "motion": "smooth",
      "borderStyle": "solid",
      "radiiScale": 1.2
    },
    "ai_tech": {
      "character": "electric, sharp, bleeding edge",
      "animationSpeed": 1.3,
      "motion": "snappy",
      "borderStyle": "hairline",
      "radiiScale": 0.6
    },
    "consumer": {
      "character": "warm, approachable, polished",
      "animationSpeed": 1.1,
      "motion": "smooth",
      "borderStyle": "hairline",
      "radiiScale": 1.4
    },
    "charitable": {
      "character": "serene, purposeful, warm",
      "animationSpeed": 0.7,
      "motion": "gentle",
      "borderStyle": "hairline",
      "radiiScale": 1.2
    },
    "platform": {
      "character": "systemic, scalable, confident",
      "animationSpeed": 1,
      "motion": "smooth",
      "borderStyle": "hairline",
      "radiiScale": 0.8
    },
    "consulting": {
      "character": "sharp, strategic, executive",
      "animationSpeed": 0.95,
      "motion": "smooth",
      "borderStyle": "hairline",
      "radiiScale": 0.8
    }
  },
  "surfaceTones": {
    "iceCool": {
      "darkBg": "#07090F",
      "darkCard": "#0E1320",
      "lightBg": "#F2F4F8",
      "lightCard": "#FFFFFF"
    },
    "cool": {
      "darkBg": "#0B0E14",
      "darkCard": "#111520",
      "lightBg": "#F0F2F5",
      "lightCard": "#FFFFFF"
    },
    "neutral": {
      "darkBg": "#0C0D10",
      "darkCard": "#14151A",
      "lightBg": "#F4F4F2",
      "lightCard": "#FFFFFF"
    },
    "warm": {
      "darkBg": "#0E0D0B",
      "darkCard": "#1A1714",
      "lightBg": "#F6F5F1",
      "lightCard": "#FFFEFB"
    },
    "emberWarm": {
      "darkBg": "#120E0A",
      "darkCard": "#1E1814",
      "lightBg": "#F8F4EE",
      "lightCard": "#FFFDF8"
    }
  },
  "glowLevels": {
    "subtle": {
      "orbs": 0.5,
      "noise": 0.25,
      "glow": 0.5,
      "grid": 0.6
    },
    "medium": {
      "orbs": 1,
      "noise": 0.35,
      "glow": 1,
      "grid": 1
    },
    "intense": {
      "orbs": 1.6,
      "noise": 0.45,
      "glow": 1.6,
      "grid": 1.2
    }
  },
  "entities": [
    {
      "id": "g26x",
      "name": "G26x",
      "ticker": "G26X",
      "tagline": "The Holding Company",
      "archetype": "holding",
      "surfaceTone": "cool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Blue"
      },
      "secondary": {
        "dark": "#1520A6",
        "light": "#0A1172",
        "name": "Azure"
      }
    },
    {
      "id": "grothouse_family",
      "name": "The Grothouse Family",
      "ticker": "GRTH",
      "tagline": "Built on Faith. Driven by Purpose.",
      "archetype": "holding",
      "surfaceTone": "cool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Cobalt"
      },
      "secondary": {
        "dark": "#5464D8",
        "light": "#1520A6",
        "name": "Azure"
      }
    },
    {
      "id": "gxre",
      "name": "G26x Real Estate",
      "ticker": "GXRE",
      "tagline": "Built to Last.",
      "archetype": "real_estate",
      "surfaceTone": "cool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#4A6D9B",
        "light": "#2D4E7E",
        "name": "Steel Blue"
      },
      "secondary": {
        "dark": "#3D4A5C",
        "light": "#2C3E4C",
        "name": "Spruce"
      }
    },
    {
      "id": "gxmg",
      "name": "G26x Management",
      "ticker": "GXMG",
      "tagline": "Operational Excellence.",
      "archetype": "consulting",
      "surfaceTone": "neutral",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#6B7FA3",
        "light": "#3D5275",
        "name": "Slate Blue"
      },
      "secondary": {
        "dark": "#8B95A8",
        "light": "#59788E",
        "name": "Stone"
      }
    },
    {
      "id": "foundation",
      "name": "The Foundation",
      "ticker": "FNDN",
      "tagline": "Faith. Family. Legacy.",
      "archetype": "charitable",
      "surfaceTone": "iceCool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#6C82D4",
        "light": "#3D52A8",
        "name": "Hyacinth"
      },
      "secondary": {
        "dark": "#2A3A7C",
        "light": "#0A1172",
        "name": "Navy"
      }
    },
    {
      "id": "xperience_mortgage",
      "name": "Xperience Mortgage",
      "ticker": "G26XM",
      "tagline": "Curated by you, for you.",
      "archetype": "consumer",
      "surfaceTone": "cool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Blue"
      },
      "secondary": {
        "dark": "#5464D8",
        "light": "#3944BC",
        "name": "Electric"
      }
    },
    {
      "id": "cooperate",
      "name": "Co-Operate",
      "ticker": "COOP",
      "tagline": "Intelligent Recruiting.",
      "archetype": "ai_tech",
      "surfaceTone": "iceCool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#5F7FFF",
        "light": "#2D4FE6",
        "name": "Electric Blue"
      },
      "secondary": {
        "dark": "#8B9AE8",
        "light": "#4A5BC4",
        "name": "Periwinkle"
      }
    },
    {
      "id": "g6x_intelligence",
      "name": "G6x Intelligence Platform",
      "ticker": "G6X",
      "tagline": "Platforms that compound.",
      "archetype": "platform",
      "surfaceTone": "cool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#4C7FBD",
        "light": "#2D5F9E",
        "name": "Ocean"
      },
      "secondary": {
        "dark": "#2D9ECB",
        "light": "#1D7FA8",
        "name": "Azure Deep"
      }
    },
    {
      "id": "g6x_ai",
      "name": "G6x AI",
      "ticker": "G6AI",
      "tagline": "Simply the Lab.",
      "archetype": "ai_tech",
      "surfaceTone": "iceCool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#7F8FFF",
        "light": "#5A6FE0",
        "name": "Indigo"
      },
      "secondary": {
        "dark": "#3944BC",
        "light": "#1520A6",
        "name": "Cobalt"
      }
    },
    {
      "id": "revosure",
      "name": "RevoSure",
      "ticker": "RVSR",
      "tagline": "Coverage, Reimagined.",
      "archetype": "financial",
      "surfaceTone": "cool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#3A8BBB",
        "light": "#1E6B9A",
        "name": "Sapphire"
      },
      "secondary": {
        "dark": "#4C7FBD",
        "light": "#2D5F9E",
        "name": "Ocean"
      }
    },
    {
      "id": "the5thyr",
      "name": "The 5th Yr",
      "ticker": "5YR",
      "tagline": "NIL. Capital. Legacy.",
      "archetype": "financial",
      "surfaceTone": "neutral",
      "glowLevel": "medium",
      "accent": {
        "dark": "#4C6FD4",
        "light": "#2D4FA8",
        "name": "Royal"
      },
      "secondary": {
        "dark": "#2A3A7C",
        "light": "#0A1172",
        "name": "Navy"
      }
    },
    {
      "id": "g6consult",
      "name": "G6 Consulting",
      "ticker": "G6C",
      "tagline": "Margins. Unlocked.",
      "archetype": "consulting",
      "surfaceTone": "neutral",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#5A6878",
        "light": "#2F3D4E",
        "name": "Gunmetal"
      },
      "secondary": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Cobalt"
      }
    },
    {
      "id": "unorthodox_labs",
      "name": "Unorthodox Labs",
      "ticker": "ULAB",
      "tagline": "Marketing, rewired.",
      "archetype": "ai_tech",
      "surfaceTone": "iceCool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#6FA8E6",
        "light": "#3D85C4",
        "name": "Sky Blue"
      },
      "secondary": {
        "dark": "#7F6FFF",
        "light": "#5A4FD6",
        "name": "Indigo"
      }
    },
    {
      "id": "axon",
      "name": "Axon",
      "ticker": "AXON",
      "tagline": "Signal over noise.",
      "archetype": "platform",
      "surfaceTone": "iceCool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#2ED0D4",
        "light": "#0E9EA8",
        "name": "Cyan"
      },
      "secondary": {
        "dark": "#4C7FBD",
        "light": "#2D5F9E",
        "name": "Ocean"
      }
    },
    {
      "id": "hive",
      "name": "Hive",
      "ticker": "HIVE",
      "tagline": "Collective intelligence.",
      "archetype": "platform",
      "surfaceTone": "iceCool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#5B8FD4",
        "light": "#2E5FA8",
        "name": "Cornflower"
      },
      "secondary": {
        "dark": "#3A5A8B",
        "light": "#1C3A6B",
        "name": "Midnight"
      }
    },
    {
      "id": "optx",
      "name": "OptX",
      "ticker": "OPTX",
      "tagline": "Optimize everything.",
      "archetype": "platform",
      "surfaceTone": "cool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#6BC8FF",
        "light": "#1D8CCD",
        "name": "Sky"
      },
      "secondary": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Cobalt"
      }
    },
    {
      "id": "revault",
      "name": "ReVault",
      "ticker": "RVLT",
      "tagline": "Your data, your vault.",
      "archetype": "platform",
      "surfaceTone": "neutral",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#8FA5C4",
        "light": "#4A6080",
        "name": "Polar"
      },
      "secondary": {
        "dark": "#3A5A8B",
        "light": "#1C3A6B",
        "name": "Midnight"
      }
    },
    {
      "id": "hobbybox",
      "name": "HobbyBox",
      "ticker": "HBBX",
      "tagline": "Curated curiosity.",
      "archetype": "consumer",
      "surfaceTone": "cool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#4FADD4",
        "light": "#2084AB",
        "name": "Lagoon"
      },
      "secondary": {
        "dark": "#5F7FC4",
        "light": "#3A5A9E",
        "name": "Lavender Blue"
      }
    },
    {
      "id": "neural_vault",
      "name": "Neural Vault",
      "ticker": "NVLT",
      "tagline": "Knowledge, secured.",
      "archetype": "ai_tech",
      "surfaceTone": "iceCool",
      "glowLevel": "intense",
      "accent": {
        "dark": "#8B7FFF",
        "light": "#5A4FD6",
        "name": "Periwinkle"
      },
      "secondary": {
        "dark": "#2ED0D4",
        "light": "#0E9EA8",
        "name": "Cyan"
      }
    },
    {
      "id": "node",
      "name": "Node",
      "ticker": "NODE",
      "tagline": "The connection layer.",
      "archetype": "platform",
      "surfaceTone": "cool",
      "glowLevel": "medium",
      "accent": {
        "dark": "#4A8CD4",
        "light": "#2D6AB8",
        "name": "Azure"
      },
      "secondary": {
        "dark": "#3944BC",
        "light": "#1338BE",
        "name": "Cobalt"
      }
    },
    {
      "id": "hearth_interiors",
      "name": "Hearth Interiors",
      "ticker": "HRTH",
      "tagline": "Homes with soul.",
      "archetype": "real_estate",
      "surfaceTone": "iceCool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#5A7AAB",
        "light": "#37537F",
        "name": "Denim"
      },
      "secondary": {
        "dark": "#3A4A6B",
        "light": "#1F2D4A",
        "name": "Twilight"
      }
    },
    {
      "id": "g26x_residential",
      "name": "G26x Residential",
      "ticker": "GXRR",
      "tagline": "Homes, built right.",
      "archetype": "real_estate",
      "surfaceTone": "cool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#6F8FAB",
        "light": "#405F7F",
        "name": "Fog Blue"
      },
      "secondary": {
        "dark": "#4C6A8B",
        "light": "#2D4A6B",
        "name": "Spruce Blue"
      }
    },
    {
      "id": "g26x_commercial",
      "name": "G26x Commercial",
      "ticker": "GXRC",
      "tagline": "Assets that endure.",
      "archetype": "real_estate",
      "surfaceTone": "neutral",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#5A7A94",
        "light": "#304F6E",
        "name": "Harbor"
      },
      "secondary": {
        "dark": "#59788E",
        "light": "#2C3E4C",
        "name": "Spruce"
      }
    },
    {
      "id": "family_office",
      "name": "Family Office",
      "ticker": "FMOF",
      "tagline": "Stewardship, coded.",
      "archetype": "financial",
      "surfaceTone": "cool",
      "glowLevel": "subtle",
      "accent": {
        "dark": "#3944BC",
        "light": "#0A1172",
        "name": "Navy"
      },
      "secondary": {
        "dark": "#5464D8",
        "light": "#1338BE",
        "name": "Cobalt"
      }
    }
  ]
};