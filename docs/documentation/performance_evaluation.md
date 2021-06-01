##

### Performance optimizaton (not tested yet)

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