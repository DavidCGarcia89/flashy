import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

if (sys.argc != 4)
    print("Uso: python3 motorsFast.py #Pin #ciclosBucle #tiempoEntreEncedidoyApagado")
    exit(1)
Motor2A = int(sys.argv[1])
bucle = int(sys.argv[2])
tiempo = int(sys.argv[3])

print(Motor2A)

GPIO.setup(Motor2A,GPIO.OUT)
for x in range(bucle)
    GPIO.output(Motor2A,GPIO.HIGH)
    sleep(0.1)
    GPIO.output(Motor2A,GPIO.LOW)   
GPIO.cleanup()