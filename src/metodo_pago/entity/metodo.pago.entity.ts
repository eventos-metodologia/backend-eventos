import { RegistrarEventoEntity } from "src/register_event/entity/register.evento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("metodo_de_pago")
export class MetodoPagoEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:100, nullable:false})
    nombre:string;

    @OneToMany(()=>RegistrarEventoEntity,(registro_evento)=>registro_evento.metodo_pago)
    registro_evento:RegistrarEventoEntity[];
}