import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

if (len(sys.argv) != 5):
    print("Uso: python3 motorsFast.py #Pin #ciclosBucle #tiempoEntreEncedidoyApagado #porcentaje(0-1)")
    exit(1)
Motor2A = int(sys.argv[1])
bucle = int(sys.argv[2])
tiempo = float(sys.argv[3])
porcentaje = float(sys.arv[4])

print(Motor2A)

GPIO.setup(Motor2A,GPIO.OUT)
for x in range(bucle*1000):
    GPIO.output(Motor2A,GPIO.HIGH)
    sleep(tiempo*porcentaje/1000)
    GPIO.output(Motor2A,GPIO.LOW) 
    sleep(tiempo*(1-porcentaje)/1000)  
GPIO.cleanup()