## C++ style

We generally follow [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html).

### Naming convention

  - Variable names should consist of lowercase words connected by underscores, e.g. ``dir_n``.
  - Class and struct names should consist of words with first letters capitalized, e.g. ``DataDumper.cpp``.
  - Macros should be capital, such as ``PI``.
  - Filenames should consist of lowercase words connected by underscores, e.g. ``particle.cpp``.

### Dos

  - Use ``auto`` for local variables when appropriate.
  - Mark ``override`` and ``const`` when necessary.

### Don'ts

  - Use smart pointers ``std::unique_ptr, std::shared_ptr``.
  - Prefix member functions with ``m_`` or ``_``.
  - ``using namespace std;`` in the global scope.

### Comment convenction

We use ``doxygen`` to automatically generate the code documentation. Thus, we encourage to follow the comment convection in doxygen.

  - Block documentation: 
  
        /**
        ……
        */
  - Line documentation:
        
        ///< …
        /** …… */

  - Useful commands:
    - @warning {warning message}
    - @todo {things to be done} 
    - @bug 
    - @brief
    - @var、@enum、@struct、@class、

### Formatting
  - clang-format
