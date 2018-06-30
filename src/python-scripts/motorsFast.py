import RPi.GPIO as GPIO
from time import sleep
from math import sin
import sys
 
GPIO.setmode(GPIO.BCM)

if (len(sys.argv) != 5):
    print("Uso: python3 motorsFast.py #Pin #ciclosBucle #porcentaje(0-1)")
    exit(1)
Motor2A = int(sys.argv[1])
bucle = int(sys.argv[2])
porcentaje = float(sys.argv[3])/100

print(Motor2A)

GPIO.setup(Motor2A,GPIO.OUT)
porcentaje0=porcentaje
for i in range(bucle*100):
    porcentaje=porcentaje0*(1+0.5*sin(i/100))
    for x in range(bucle*100):
        GPIO.output(Motor2A,GPIO.HIGH)
        sleep(porcentaje/1000)
        GPIO.output(Motor2A,GPIO.LOW) 
        sleep((1-porcentaje)/1000)  
GPIO.cleanup()