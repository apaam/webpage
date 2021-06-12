### Coding style

We generally follow [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html).

#### Naming

  - Filenames: lowercase words connected by underscores, e.g. ``particle.hpp``, ``contact_pp.cpp``.
  - Variable names: lowercase words connected by underscores, e.g. ``dir_n``.
  - Class and struct names: words with first letters capitalized, e.g. ``DataDumper``.
  - Macros: should be capital, such as ``PI``.

#### Comment

  - Comment is not a requisite, but please add it if an attribute or method is not self-explainary or is ambigious.
  - We use [doxygen](https://www.doxygen.nl/index.html) to generate the code documentation. We suggest the following comment format.
    - Block documentation (e.g., for class description): 
  
          ```
          /** descriptions */
          ```

    - Line documentation: 
        
          ```
          /// descriptions
          ```

    - Other commands if approperiate: @warning {warning message}, @todo {things to be done}, @bug , @brief, @var、@enum、@struct、@class、

#### Formatting
  - Use [clang-format](https://clang.llvm.org/docs/ClangFormat.html).

#### Programing rules

  - Use ``auto`` for local variables when appropriate.
  - Mark ``const`` when appropriate.
  - Reference vs. pointer:
    - If a variable will not be altered after calling the function, use reference with ``const`` mark, e.g., ``const double &[variable]``.
    - If a variable will be altered, use pointer. For int or double, as well as lists of int or double, mark with ``const`` (e.g., ``double *const [variable]``) to aboid mistakenly modifying the pointer.
    - If a variable will not be altered but its value will be passed and stored the calling instance, use pointer.
  - Following the previous item, if you are going to modify a variable, please declare it or passing it as an argument with with ``&``.
  - Prefer use c++ std library rather than c library, e.g., use ``<cmath>`` rather than ``<math.h>``.
  - **Avoid** using smart pointers, such as ``std::unique_ptr``, ``std::shared_ptr``.
  - **Never** ever use "using" (e.g., ``using namespace std``) in **headers**.


### Performance evaluation

#### Procedures

- Tool: linux perf

- To probe the performance：

```
sudo perf stat build/bin/tmp_debug

 Performance counter stats for 'build/bin/tmp_debug':

         12,639.97 msec task-clock                #    0.983 CPUs utilized
             1,284      context-switches          #    0.102 K/sec
                42      cpu-migrations            #    0.003 K/sec
            13,356      page-faults               #    0.001 M/sec
    26,566,855,696      cycles                    #    2.102 GHz
    56,713,820,846      instructions              #    2.13  insn per cycle
    10,275,875,523      branches                  #  812.967 M/sec
        31,362,265      branch-misses             #    0.31% of all branches

      12.857522834 seconds time elapsed

      11.472000000 seconds user
       1.120000000 seconds sys
```

- To sample CPU usage:

```
sudo perf record -e task-clock -g build/bin/tmp_debug
sudo perf report -i perf.data
```


- To generate heat map and visual:

```
git clone --depth 1 https://github.com/brendangregg/FlameGraph.git
FlameGraph/stackcollapse-perf.pl out.perf > out.folded
FlameGraph/flamegraph.pl out.folded > out.svg
```
```
sudo perf script > out.perf  # then upload out.perf to https://www.speedscope.app/ to visual
```