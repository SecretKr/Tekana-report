s = input()
f = open("items.json", "w", encoding="utf-8")
f.write('{"data": {')
first = True
p = ''
while s != "-1":
  d = s.split(",")
  if p == d[0].split("[")[1]:
    f.write(',')
  else:
    if first:
      p = d[0].split("[")[1]
      f.write(str(p))
      f.write(': {')
      count = 1
      first = False
    else:
      p = d[0].split("[")[1]
      f.write("},")
      f.write(str(p))
      f.write(': {')
      count = 1
  
  f.write('"' + str(count) + '": {')
  if d[1][0] == "'": f.write('"size": ' + str(d[1].replace('"','\\"').replace("'",'"')) + ',')
  else: f.write('"size": ' + str(d[1]) + ',')
  f.write('"price": ' + str(d[2]) + ',')
  if d[3].split("]")[0] == "''" or d[3].split("]")[0] == '""': f.write('"suffix": ""')
  if d[3].split("]")[0] == "'\"'": f.write('"suffix": "\\""')
  f.write('}')
  count += 1
  
  s = input()

f.write("}}}")
f.close()