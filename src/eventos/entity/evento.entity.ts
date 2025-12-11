import { RegistrarEventoEntity } from "src/register_event/entity/register.evento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("evento")
export class EventoEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:100, unique:true, nullable:false})
    nombre:string;
    @Column({type:"date", nullable:false})
    fecha:Date;
    @Column({type:"varchar", length:100, nullable:false})
    hora:string;
    @Column({type:"varchar", length:150, nullable:false})
    ubicacion:string;
    @Column({type:"varchar", length:100, nullable:false})
    organizador:string;
    @Column({type:"varchar", length:50, nullable:false})
    valor:string;

    @OneToMany(()=>RegistrarEventoEntity,(registro)=>registro.evento)
    registros:RegistrarEventoEntity[];
}