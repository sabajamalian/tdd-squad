# Squad Decisions

## Active Decisions

### 2026-03-24: Converter class interface — `convert(value, from_unit, to_unit) -> float`
**By:** Red (requested by Saba)
**What:** All converter classes (Distance, Volume, Temperature) use the same method signature: `convert(value, from_unit, to_unit) -> float`. Import path pattern: `from src.{module} import {Class}`.
**Why:** Consistent API across all converters. Established in Red phase tests before implementation.

### 2026-03-24: Volume unit naming conventions
**By:** Red (requested by Saba)
**What:** "gallons" = US gallons, "gallons uk" = Imperial gallons. Same pattern for fluid ounces. "barrels" = oil barrels (42 US gallons / 158.987 liters).
**Why:** Disambiguates US vs Imperial volume units in the converter API.

### 2026-03-24: Temperature converter uses offset formulas
**By:** Red (requested by Saba)
**What:** Temperature tests verify offset formulas (not simple multiplication). Supports 8 scales: Celsius, Fahrenheit, Kelvin, Rankine, Réaumur, Delisle, Newton, Rømer.
**Why:** Temperature conversion is fundamentally different from distance/volume (additive offsets, not just scale factors).

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
