import RPi.GPIO as GPIO    #Importamos la libreria RPi.GPIO
import time                #Importamos time para poder usar time.sleep
import sys

GPIO.setmode(GPIO.BCM)   #Ponemos la Raspberry en modo BOARD
GPIO.setup(sys.argv[1],GPIO.OUT)    #Ponemos el pin 21 como salida
p = GPIO.PWM(sys.argv[1],50)        #Ponemos el pin 21 en modo PWM y enviamos 50 pulsos por segundo
p.start(7.5)            #Enviamos un pulso del 7.5% para centrar el servo
duracionGiroInicial = sys.argv[2] or 5
duracionGiroContrario = sys.argv[3] or 5
anguloInicial = sys.argv[4] or 4.5
anguloFinal = sys.argv[5] or 10.5
t_end = time.time() + duracionGiroInicial 
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(anguloInicial)      #Enviamos un pulso del 4.5% para girar el servo hacia la izquierda
t_end = time.time() + duracionGiroContrario             
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(anguloFinal)     #Enviamos un pulso del 10.5% para girar el servo hacia la derecha
p.stop()                      #Detenemos el servo 
GPIO.cleanup()                #Limpiamos los pines GPIO de la Raspberry y cerramos el script