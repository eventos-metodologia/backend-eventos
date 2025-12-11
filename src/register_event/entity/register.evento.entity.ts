import { EventoEntity } from "src/eventos/entity/evento.entity";
import { MetodoPagoEntity } from "src/metodo_pago/entity/metodo.pago.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("registrar_evento")
export class RegistrarEventoEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:100, nullable:false})
    nombre:string;
    @ManyToOne(()=>EventoEntity,(evento)=>evento.registros)
    evento:EventoEntity;
    @Column({type:"varchar", length:255, nullable:false})
    correo:string;
    @Column({type:"varchar", length:12, nullable:false})
    telefono:string;
    @ManyToOne(()=>MetodoPagoEntity,(metodo_pago)=>metodo_pago.registro_evento)
    metodo_pago:MetodoPagoEntity;
    @Column({type:"varchar", length:100, nullable:false})
    programa:string;
    @Column({type:"boolean", nullable:false, default:true})
    terms_conditions:boolean;
}