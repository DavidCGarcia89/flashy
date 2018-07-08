import RPi.GPIO as GPIO    #Importamos la libreria RPi.GPIO
import time                #Importamos time para poder usar time.sleep
import sys

pin = int(sys.argv[1])
GPIO.setmode(GPIO.BCM)   #Ponemos la Raspberry en modo BOARD
GPIO.setup(pin,GPIO.OUT)    #Ponemos el pin 21 como salida
p = GPIO.PWM(pin,50)        #Ponemos el pin 21 en modo PWM y enviamos 50 pulsos por segundo
p.start(7.5)            #Enviamos un pulso del 7.5% para centrar el servo
num_elementos = len(sys.argv)
print(len(sys.argv))
if num_elementos > 2:
    duracionGiroInicial = float(sys.argv[2])
else:
    duracionGiroInicial = 3.0
if num_elementos > 3:
    duracionGiroContrario = float(sys.argv[3])
else:
    duracionGiroContrario = 3.0
if num_elementos > 4:
    anguloInicial = float(sys.argv[4])
else:
    anguloInicial = 4.5
if num_elementos > 5:
    anguloFinal = float(sys.argv[5])
else:
    anguloFinal = 10.5
print(duracionGiroInicial)
print(duracionGiroContrario)
print(anguloInicial)
print(anguloFinal)
print("Iniciamos primer giro")
t_end = time.time() + duracionGiroInicial 
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(anguloInicial)      #Enviamos un pulso del 4.5% para girar el servo hacia la izquierda
t_end = time.time() + duracionGiroContrario
print("Iniciamos segundo giro")         
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(anguloFinal)     #Enviamos un pulso del 10.5% para girar el servo hacia la derecha
print("Terminamos")
p.stop()                      #Detenemos el servo 
GPIO.cleanup()                #Limpiamos los pines GPIO de la Raspberry y cerramos el script