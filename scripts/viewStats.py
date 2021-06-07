import json
import matplotlib.pyplot as plt
import numpy as np

stats=json.load(open("B:\\CodeWorkspaces\\WebDev\\final-project-squirtle-squad\\resources\\pokemon.json", encoding='utf-8'))

statToLookAt = "base_happiness"

daStats = []

for pokemon in stats:
    # print(pokemon[statToLookAt])
    if pokemon[statToLookAt] == '':
        daStats.append(0.0)
    else:
        try:
            daStats.append(float(pokemon[statToLookAt]))
        except:
            #Whatever
            print("Bad stat")

print(daStats)
print("Average: " + str(np.mean(daStats)))

fig, ax = plt.subplots()
# ax.locator_params(axis='x', tight=True, nbins=4)
# for label in (ax.get_xticklabels() + ax.get_yticklabels()):
# 	label.set_fontsize(12)

ax.hist(daStats, bins=20)
plt.show()