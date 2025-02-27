javaaddpath mysql-connector-java-5.1.12-bin.jar

dbName = 'sql12764398';              
username = 'sql12764398';            
password = '2qICIsdaVB';             
server = 'sql12.freesqldatabase.com'; 
port = 3306;                         

refreshRate = 5; 
runForever = true; 


while runForever
    
    conn = database(dbName, username, password, ...
        'Vendor', 'MySQL', ...
        'Server', server, ...
        'PortNumber', port);

    
    if isopen(conn)
        fprintf('+++++เชื่อมต่อฐานข้อมูลสำเร็จ! กำลังโหลดข้อมูล...\n');
        
        
        query = "SELECT * FROM sp_transaction ORDER BY id DESC";
        
        data = fetch(conn, query);
        

        clear oldData;
        

        fprintf('***ข้อมูลอัปเดตล่าสุดจากฐานข้อมูล:\n');
        disp(head(data, 6)); 


        close(conn);
        fprintf('🔌 ปิดการเชื่อมต่อเรียบร้อย\n\n');

    else
        fprintf('------การเชื่อมต่อล้มเหลว: %s\n', conn.Message);
    end

  
    pause(refreshRate);

   
    if ~runForever
        break;
    end
end


clear dbName username password server port conn query data refreshRate runForever

