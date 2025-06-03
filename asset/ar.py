import numpy as np
import matplotlib.pyplot as plt

# 模拟数据（需替换为真实数据）
years = [2020, 2021, 2022, 2023]
Q = np.array([500000, 930422, 1369611, 1806236])  # 产量
LTC = np.array([250, 450, 620, 780]) * 1e8       # 长期总成本（美元）
LAC = LTC / Q                                    # 长期平均成本
LMC = np.diff(LTC) / np.diff(Q)                  # 长期边际成本（需补全首项）
LMC = np.insert(LMC, 0, np.nan)                  # 首年LMC无数据

# 生成连续曲线数据（用于平滑绘图）
Q_smooth = np.linspace(Q.min(), Q.max(), 1000)
LAC_smooth = 5000 - 0.002 * Q_smooth + 0.0000001 * Q_smooth**2  # 模拟U型LAC曲线
LMC_smooth = -0.002 + 0.0000002 * Q_smooth                       # 模拟LMC曲线

# 绘制图形
plt.figure(figsize=(10, 6))

# 1. 长期总成本曲线（LTC）
plt.subplot(2, 1, 1)
plt.plot(Q, LTC/1e8, 'o-', color='blue', label='LTC')
plt.title('特斯拉长期总成本曲线（LTC）')
plt.xlabel('产量（辆）')
plt.ylabel('长期总成本（亿美元）')
plt.grid(True)
plt.legend()

# 2. 长期平均成本与边际成本曲线（LAC & LMC）
plt.subplot(2, 1, 2)
plt.plot(Q_smooth, LAC_smooth, color='red', label='LAC')
plt.plot(Q_smooth, LMC_smooth, color='green', linestyle='--', label='LMC')
plt.scatter(Q, LAC, color='red', zorder=3)  # 标注实际数据点
plt.scatter(Q[1:], LMC[1:], color='green', zorder=3)  # 标注LMC数据点
plt.title('特斯拉长期平均成本与边际成本曲线（LAC & LMC）')
plt.xlabel('产量（辆）')
plt.ylabel('成本（美元/辆）')
plt.legend()
plt.grid(True)
plt.tight_layout()

# 显示图形（可保存为PNG/JPG）
plt.show()