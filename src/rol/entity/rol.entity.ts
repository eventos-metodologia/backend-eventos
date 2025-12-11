import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rol")
export class RolEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:"varchar", length:30, unique:true, nullable:false})
    nombre:string;
    @OneToMany(()=> UserEntity,(user)=>user.rol)
    users:UserEntity[];
}