---
title: "StringUtils"
displayed_sidebar: pythonApiSidebar
---

# StringUtils

> **C++**: `phynexis::utils::to_string`
> **Python**: `phynexis.utils.to_string`
> **Header**: `src/utils/string_utils.hpp`

Numeric-to-string conversion with consistent formatting.

---

## Functions

### `to_string(value)`

Convert a numeric value to a formatted string.

**Overloads:**
| Signature | Description |
|------|------|
| `to_string(value: int) -> str` | Integer formatting |
| `to_string(value: float) -> str` | Scientific notation for doubles |

**Parameters:**
| Parameter | Type | Description |
|------|------|------|
| `value` | `int` \| `float` | Numeric value to convert |

**Returns:**`str` — Formatted string

**Example:**
```python
import phynexis

print(phynexis.utils.to_string(42))
print(phynexis.utils.to_string(3.14))
print(phynexis.utils.to_string(1e-6))
print(phynexis.utils.to_string(-2.5e3))
```

**Output:**
```text
42
3.140000e+00
1.000000e-06
-2.500000e+03
```

---

## Unexposed C++ API

The following C++ string utilities are not yet exposed to Python:

- `SplitString` / `JoinString` — string split/join
- `Trim` / `ToLower` / `ToUpper` — string transforms
- `FormatString` — formatted string (C++ fmt style)
