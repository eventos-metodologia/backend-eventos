import { EventoEntity } from "src/eventos/entity/evento.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity("categoria")
export class CategoriaEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:100, unique:true, nullable:false})
    nombre:string;
    @OneToMany(()=>EventoEntity,(evento)=>evento.categoria)
    eventos:EventoEntity[];
}