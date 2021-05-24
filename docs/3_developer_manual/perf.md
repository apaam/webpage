## 性能调优
*  linux perf 工具

- 分析性能卡在哪：

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

可以看出 `task-clock` 偏高， 说明CPU任务占用多。

- 采样cpu 指标

```
sudo perf record -e task-clock -g build/bin/tmp_debug
sudo perf report -i perf.data

可以看到具体的调用链
```


- 火焰图

本地火焰图：
```
# 下载火焰图生成工程
git clone --depth 1 https://github.com/brendangregg/FlameGraph.git

# 折叠调用栈
FlameGraph/stackcollapse-perf.pl out.perf > out.folded

# 生成火焰图
FlameGraph/flamegraph.pl out.folded > out.svg
```

在线火焰图：
```
sudo perf script > out.perf   # 将 perf.data 的内容 dump 到 out.perf
将内容拖入到： https://www.speedscope.app/ 中
```