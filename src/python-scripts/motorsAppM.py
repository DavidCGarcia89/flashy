import RPi.GPIO as GPIO    #Importamos la libreria RPi.GPIO
import time                #Importamos time para poder usar time.sleep

GPIO.setmode(GPIO.BCM)   #Ponemos la Raspberry en modo BOARD
GPIO.setup(21,GPIO.OUT)    #Ponemos el pin 21 como salida
p = GPIO.PWM(21,50)        #Ponemos el pin 21 en modo PWM y enviamos 50 pulsos por segundo
p.start(7.5)               #Enviamos un pulso del 7.5% para centrar el servo
t_end = time.time() + 5
               
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(4.5)      #Enviamos un pulso del 4.5% para girar el servo hacia la izquierda
                                #pausa de medio segundo
t_end = time.time() + 5             
while time.time() < t_end:      #iniciamos un loop
    p.ChangeDutyCycle(10.5)     #Enviamos un pulso del 10.5% para girar el servo hacia la derecha
                                    #pausa de medio segundo
        # p.ChangeDutyCycle(7.5)    #Enviamos un pulso del 7.5% para centrar el servo de nuevo
        # time.sleep(0.5)           #pausa de medio segundo
t_end = time.time() + 5
cycle = 10.5  
while time.time() < t_end: 
    p.ChangeDutyCycle(cycle)
    cycle = cycle - 0.1

print("Paramos el bucle")         #Si el usuario pulsa CONTROL+C entonces...
p.stop()                      #Detenemos el servo 
GPIO.cleanup()                #Limpiamos los pines GPIO de la Raspberry y cerramos el script